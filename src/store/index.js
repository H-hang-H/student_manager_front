import Vue from 'vue'
import Vuex from 'vuex'
import student from './student'
import login from './login'
Vue.use(Vuex)
export default new Vuex.Store({
   modules:{
       student,
       login
   }
})