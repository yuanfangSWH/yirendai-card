import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    //存储token
    landing: localStorage.getItem('landing') ? localStorage.getItem('landing') : ''
  },

  mutations: {
    //将token存入localStorage
    changeLogin(state, user) {
      state.landing = user.landing;
      localStorage.setItem('landing', user.landing);
    }
  }
});


export default store