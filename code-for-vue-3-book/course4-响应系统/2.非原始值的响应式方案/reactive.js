import { isSetObject, isMapObject } from "./utils.js";

// 存储副作用函数的桶
const bucket = new WeakMap();

const ITERATE_KEY = Symbol();
const MAP_KEY_ITERATE_KEY = Symbol();

function track(target, key) {
  if (!activeEffect || !shouldTrack) return;
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  // 当前活跃的 activeEffect.deps 收集deps
  activeEffect.deps.push(deps);
}

function trigger(target, key, type, newVal) {
  const depsMap = bucket.get(target);
  if (!depsMap) {
    return;
  }
  const effects = depsMap.get(key);

  const effectsToRun = new Set();
  effects &&
    effects.forEach((effectFn) => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });

  // 判断 target 是Map，并且是 set 类型
  const isMapAndSet = isMapObject(target) && type === "SET";

  if (type === "ADD" || type === "DELETE" || isMapAndSet) {
    const iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  if (isMapObject(target) && (type === "ADD" || type === "DELETE")) {
    const iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  if (type === "ADD" && Array.isArray(target)) {
    const lengthEffects = depsMap.get("length");
    lengthEffects &&
      lengthEffects.forEach((effectFn) => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  if (Array.isArray(target) && key === "length") {
    depsMap.forEach((effects, key) => {
      if (key >= newVal) {
        effects.forEach((effectFn) => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn);
          }
        });
      }
    });
  }

  effectsToRun.forEach((effectFn) => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}

// 用一个全局变量 activeEffect 存储当前激活的 effect 函数
let activeEffect;
// effect 栈
const effectStack = [];

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    activeEffect = effectFn;
    // 在调用副作用函数之前将当前的副作用函数压栈
    effectStack.push(effectFn);
    const res = fn();
    // 在当前副作用函数执行完毕后，将当前的副作用函数弹出栈，并还原 activeEffect 为之前的值
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];

    return res;
  };
  // 将 options 挂载到 effectFn上
  effectFn.options = options;
  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合（保存的是set集合，【set()，set()，set()】）
  effectFn.deps = [];
  // 执行副作用函数
  if (!options.lazy) {
    effectFn();
  }

  return effectFn;
}

function cleanup(effectFn) {
  for (let index = 0; index < effectFn.deps.length; index++) {
    const deps = effectFn.deps[index];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

const reactiveMap = new Map();
function reactive(obj) {
  const proxy = createReactive(obj);
  const existionProxy = reactiveMap.get(obj);
  if (existionProxy) {
    return existionProxy;
  }
  reactiveMap.set(obj, proxy);
  return proxy;
}

function shallowReactive(obj) {
  return createReactive(obj, true);
}

function readonly(obj) {
  return createReactive(obj, false, true);
}

function shallowReadonly(obj) {
  return createReactive(obj, true, true);
}

const arrayInstrumentations = {};
["includes", "indexOf", "lastIndexOf"].forEach((method) => {
  const originalMethod = Array.prototype[method];
  arrayInstrumentations[method] = function (...args) {
    // this 是代理对象，先在代理对象中查找，将结果存储到 res 中
    let res = originalMethod.apply(this, args);
    if (res === false) {
      // res 为 false 说明没找到，在通过 this.raw 拿到原始数组，再去原始数组中查找
      res = originalMethod.apply(this.raw, args);
    }
    return res;
  };
});

let shouldTrack = true;
["push", "unshift", "pop", "shift"].forEach((method) => {
  const originalMethod = Array.prototype[method];
  arrayInstrumentations[method] = function (...args) {
    shouldTrack = false;
    let res = originalMethod.apply(this, args);
    shouldTrack = true;
    return res;
  };
});

const setInstrumentations = {
  add(key) {
    const target = this.raw;
    const hasKey = target.has(key);
    const res = target.add(key);
    if (!hasKey) {
      trigger(target, key, "ADD");
    }
    return res;
  },
  delete(key) {
    const target = this.raw;
    const res = target.delete(key);
    trigger(target, key, "DELETE");
    return res;
  },
};

const mapInstrumentations = {
  get(key) {
    // 获取代理对象的原始对象
    const target = this.raw;
    const had = target.has(key);
    track(target, key);
    if (had) {
      const res = target.get(key);
      return typeof res === "object" ? reactive(res) : res;
    }
  },
  set(key, newVal) {
    const target = this.raw;
    const had = target.has(key);
    const oldValue = target.get(key);
    // set时，如果是代理，要设置代理的原始值。避免污染原始数据
    const rawValue = newVal.raw || newVal;
    target.set(key, rawValue);
    if (!had) {
      trigger(target, key, "ADD");
    } else if (
      oldValue !== newVal &&
      (oldValue === oldValue || newVal === newVal)
    ) {
      trigger(target, key, "SET");
    }
  },
  delete(key) {
    const target = this.raw;
    const res = target.delete(key);
    if (res) {
      trigger(target, key, "DELETE");
    }
    return res;
  },
  forEach(callback) {
    // 如果value 值是对象，需要将value也设置为响应式的
    const wrap = (val) => (typeof val === "object" ? reactive(val) : val);
    const target = this.raw;
    track(target, ITERATE_KEY);
    target.forEach((v, k) => {
      callback(wrap(v), wrap(k), this);
    });
  },
  [Symbol.iterator]: iterationMethod,
  entries: iterationMethod,
  keys: keysIterationMethod,
  values: valuesIterationMethod,
};

function iterationMethod() {
  const target = this.raw;
  // 获取原始值的迭代器方法
  const itr = target[Symbol.iterator]();
  const wrap = (val) => (typeof val === "object" ? reactive(val) : val);
  track(target, ITERATE_KEY);
  return {
    next() {
      const { value, done } = itr.next();
      return {
        value: value ? [wrap(value[0]), wrap(value[1])] : value,
        done,
      };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

function keysIterationMethod() {
  const target = this.raw;
  // 获取原始值的迭代器方法
  const itr = target.keys();
  const wrap = (val) => (typeof val === "object" ? reactive(val) : val);
  track(target, MAP_KEY_ITERATE_KEY);
  return {
    next() {
      const { value, done } = itr.next();
      return {
        value: wrap(value),
        done,
      };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

function valuesIterationMethod() {
  const target = this.raw;
  const itr = target.values();
  const wrap = (val) => (typeof val === "object" ? reactive(val) : val);
  track(target, ITERATE_KEY);
  return {
    next() {
      const { value, done } = itr.next();
      return {
        value: wrap(value),
        done,
      };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      if (key === "raw") {
        return target;
      }

      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }

      // 判断是否是 Set
      if (isSetObject(target)) {
        if (key === "size") {
          track(target, ITERATE_KEY);
          return Reflect.get(target, key, target);
        } else {
          return Reflect.get(setInstrumentations, key, receiver);
        }
      }

      // 判断是否是 Map
      if (isMapObject(target)) {
        if (key === "size") {
          track(target, ITERATE_KEY);
          return Reflect.get(target, key, target);
        } else {
          return Reflect.get(mapInstrumentations, key, receiver);
        }
      }

      // 非只读的时候才需要建立响应联系
      if (!isReadonly && typeof key !== "symbol") {
        track(target, key);
      }

      const res = Reflect.get(target, key, receiver);
      if (isShallow) {
        return res;
      }
      if (typeof res === "object" && res !== null) {
        // 深只读/响应
        return isReadonly ? readonly(res) : reactive(res);
      }
      return res;
    },
    set(target, key, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`);
        return true;
      }
      const oldVal = target[key];
      const type = Array.isArray(target)
        ? Number(key) < target.length
          ? "SET"
          : "ADD"
        : Object.prototype.hasOwnProperty.call(target, key)
        ? "SET"
        : "ADD";
      const res = Reflect.set(target, key, newVal, receiver);
      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type, newVal);
        }
      }
      return res;
    },
    deleteProperty(target, key) {
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`);
        return true;
      }
      const hasKey = Object.prototype.hasOwnProperty.call(target, key);
      const res = Reflect.deleteProperty(target, key);
      if (res && hasKey) {
        trigger(target, key, "DELETE");
      }
      return res;
    },
    has(target, key) {
      track(target, key);
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      // 如果是通过 for..in 遍历数组，则将 length 作为key
      const normalKey = Array.isArray(target) ? "length" : ITERATE_KEY;
      track(target, normalKey);
      return Reflect.ownKeys(target);
    },
  });
}

export {
  track,
  trigger,
  effect,
  reactive,
  shallowReactive,
  readonly,
  shallowReadonly,
  ITERATE_KEY,
};
