let retryNums = 1;
// 封装一个 fetch 函数，用来模拟接口请求
function fetchMethod() {
  return new Promise((resolve, reject) => {
    retryNums++;
    setTimeout(() => {
      reject("request error");
    }, 1000);
    if (retryNums === 10) {
      resolve("sucess message");
    }
  });
}

// 为了实现失败后的重试，我们需要封装一个 load 函数
// load 函数接收一个 onError 回调函数
function load(onError) {
  const p = fetchMethod();
  return p.catch((err) => {
    // 当错误发生时，返回一个新的 Promise 实例，并调用 onError 回调
    // 同时将 retry 函数作为 onError 的回调的参数
    return new Promise((resolve, reject) => {
      // retry 函数，用来执行重试的函数，执行该函数会重新调用 load 函数并发起请求
      const retry = () => resolve(load(onError));
      const fail = () => reject(err);
      onError(retry, fail);
    });
  });
}

load((retry, err) => {
  retry();
  console.log("99", retry, err);
}).then((res) => {
  console.log(res);
});
