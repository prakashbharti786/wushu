import Vue from 'vue'

const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  namespaced: true,

  state: {
    user: {},
    token: {
      token: null,
      refreshToken: null,
      expiresIn: null
    }
  },

  mutations: {
    setData(state, obj) {
      state[obj.name] = obj.data
    },
    addData(state, obj) {
      state[obj.name].push(obj.data)
    },
    setObjData(state, obj) {
      Vue.set(state[obj.name], obj.key, obj.data)
    },
    deleteData(state, obj) {
      state[obj.key].splice(obj.index, 1)
    }
  },

  actions: {
    authenticateUser({ commit, state }, obj) {
      // const expires = dateDiffDays(new Date().getTime(), obj.expires)
      const date = new Date()
      date.setDate(date.getDate() + 7)
      const expiresIn = date.getTime()
      commit('setObjData', { name: 'token', key: 'token', data: obj.token })
      commit('setObjData', {
        name: 'token',
        key: 'refreshToken',
        data: obj.refreshToken
      })
      Cookie.set('jwt', obj.token, {
        domain: process.env.domain,
        expires: expiresIn
      })
      Cookie.set('refreshToken', obj.refreshToken, {
        domain: process.env.domain,
        expires: expiresIn
      })
    },

    initAuth({ state, commit, dispatch }, req) {
      let token, refreshToken
      if (req.headers.cookie) {
        const Cookie = cookieparser.parse(req.headers.cookie)
        if (!Cookie) {
          dispatch('logout')
          return
        }
        token = Cookie.jwt
        refreshToken = Cookie.refreshToken
        commit('setObjData', { name: 'token', key: 'token', data: token })
        commit('setObjData', {
          name: 'token',
          key: 'refreshToken',
          data: refreshToken
        })
        commit('setObjData', {
          name: 'token',
          key: 'refreshToken',
          data: refreshToken
        })
      }
    },

    logout({ commit, dispatch }) {
      commit('setObjData', { name: 'token', key: 'token', data: null })
      if (process.client) {
        Cookie.remove('jwt', { domain: process.env.domain })
        Cookie.remove('refreshToken', { domain: process.env.domain })
        dispatch('resetAll')
      }
    },

    async fetchUser({ commit }) {
      const data = await this.$axios.$get('auth/me')
      commit('setData', { data, name: 'user' })
    },

    resetAll() {}
  },

  getters: {
    isAuthenticated(state) {
      return state.token.token != null
    },
    token(state) {
      return state.token.token
    },
    getUser(state) {
      return state.user
    }
  }
}
