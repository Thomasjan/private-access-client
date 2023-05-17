import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      // Define your state properties here
      counter: 0
    };
  },
  mutations: {
    // Define your mutations here
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  },
  actions: {
    // Define your actions here
    increment(context) {
      context.commit('increment');
    },
    decrement(context) {
      context.commit('decrement');
    }
  },
  getters: {
    // Define your getters here
    counterSquared(state) {
      return state.counter ** 2;
    }
  }
});

export default store;