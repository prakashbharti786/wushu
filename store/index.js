import Vuex from 'vuex'
import auth from './auth'
import core from './core'
import forms from './forms'

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      core,
      forms
    },
    actions: {
      async nuxtServerInit({ getters, dispatch }, { req }) {
        dispatch('auth/initAuth', req)
        if (getters['auth/isAuthenticated']) {
          await dispatch('auth/fetchUser')
        }
      }
    }
  })

export default store
