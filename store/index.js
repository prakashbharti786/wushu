import Vuex from 'vuex'
import auth from './auth'
import core from './core'

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      core
    },
    actions: {
      async nuxtServerInit({ getters, dispatch }, { req }) {
        dispatch('auth/initAuth', req)
        if (getters['auth/isAuthenticated']) {
          try {
            await dispatch('auth/fetchUser')
          } catch (e) {
            dispatch('auth/logout')
          }
        }
      }
    }
  })

export default store
