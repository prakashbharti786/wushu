import Vue from 'vue'

const cookieparser = process.server ? require('cookieparser') : undefined
const Cookie = process.client ? require('js-cookie') : undefined

// eslint-disable-next-line no-unused-vars
const dateDiffDays = (date1, date2) => {
  const dt1 = new Date(date1)
  const dt2 = new Date(date2)
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  )
}

const defaultAuthState = () => {
  return {
    user: {},
    token: {
      token: null,
      refreshToken: null,
      expiresIn: null
    }
  }
}

export default {
  namespaced: true,

  state: defaultAuthState,

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
    },
    resetState(state) {
      Object.assign(state, defaultAuthState())
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

    async signIn({ commit, state, dispatch }, obj) {
      const data = await this.$axios.$post('signin', obj)
      const returnData = data
      dispatch('authenticateUser', data.token)
      delete data.token
      commit('setData', { data, name: 'user' })
      return returnData
    },

    async signUp({ commit, state, dispatch }, obj) {
      const data = await this.$axios.$post('signup', obj)
      dispatch('authenticateUser', data.token)
      delete data.token
      commit('setData', { data, name: 'user' })
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
      }
    },

    logout({ commit, dispatch }) {
      commit('setObjData', { name: 'token', key: 'token', data: null })
      commit('setObjData', {
        name: 'token',
        key: 'refreshToken',
        data: null
      })
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

    resetAll({ commit }) {
      commit('resetState')
      if (process.client) {
        this.commit('core/resetState')
        this.commit('forms/resetState')
      }
    }
  },

  getters: {
    isAuthenticated(state) {
      return !!state.token.token
    },
    token(state) {
      return state.token.token
    },
    getUser(state) {
      return state.user
    }
  }
}
