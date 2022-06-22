import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 666,
    };
  },
  getters: {
    doubleNumber(state) {
      return state.count * 2;
    },
  },
  mutations: {
    add(state) {
      state.count++;
    },
  },
});

export default store;
