import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import auth from './auth'
import doctor from './doctor'
import resource from "./resource";
import citizen from "./citizen"
import application from "@/store/application";
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    doctor,
    resource,
    citizen,
    application
  }
})

export default store
