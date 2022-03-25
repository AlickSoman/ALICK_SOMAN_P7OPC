import { createStore } from 'vuex'



export default createStore({
  state: {
    isLogged: localStorage.getItem('token'),
    // format: events
  },
  mutations: {
  },
  actions: {
    
  },
  modules: {
  }
})
