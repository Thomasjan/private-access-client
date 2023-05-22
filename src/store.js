import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: {
      id: '',
      email: '',
      name: '',
      surname: '',
    },
  },

  
  mutations: {
    
    UPDATE_USER(state, data) {
      state.user = { ...data };
    },
    DELETE_USER(state) {
      state.user = {}
    },
  },

  actions: {
    
    UPDATE_USER({ commit }, updatedUser) {
      commit('UPDATE_USER', updatedUser);
    },
    DELETE_USER({ commit }) {
      commit('DELETE_USER');
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    
  },
});

export default store;
