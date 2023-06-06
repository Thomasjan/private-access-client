import { createStore } from 'vuex';
import Download from './services/downloads.service'

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

    DOWNLOAD_FILE(state, data){
      state.file = { ...data };
    }

  },

  actions: {
    
    UPDATE_USER({ commit }, updatedUser) {
      commit('UPDATE_USER', updatedUser);
    },
    DELETE_USER({ commit }) {
      commit('DELETE_USER');
    },

    addDownload({ commit, state }, file) {
      const download = {
        entreprise_id: state.user.entreprise_id,
        email: state.user.email,
        name: state.user.name,
        surname: state.user.surname,
        file_name: file,
      };
  
      return Download.addDownload(download)
        .then(res => {
          console.log(res);
          // Additional logic if needed
        })
        .catch(err => {
          console.log(err);
          // Additional error handling if needed
        });
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    
  },
});

export default store;
