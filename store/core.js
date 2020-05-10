import Vue from 'vue'

const defaultCoreState = () => {
  return {
    snackbar: {
      actionText: '',
      message: ''
    },
    alert: {
      title: '',
      defaultTitle: 'Something went wrong or unable to connect',
      body: '',
      disableDismissive: false,
      show: false
    },
    appLoading: false,
    feedback: false,
    breadCrumbs: [],
    country: [],
    institution: [],
    libraryId: undefined
  }
}

export default {
  namespaced: true,

  state: defaultCoreState,

  mutations: {
    setData(state, obj) {
      state[obj.name] = obj.data
    },
    setSnackbar(state, obj) {
      for (const key in obj) {
        Vue.set(state.snackbar, key, obj[key])
      }
    },
    setAlert(state, obj) {
      for (const key in obj) {
        Vue.set(state.alert, key, obj[key])
      }
    },
    setAppLoading(state, val) {
      state.appLoading = val
    },
    setBreadCrumbs(state, val) {
      state.breadCrumbs = val
    },
    resetState(state) {
      Object.assign(state, defaultCoreState())
    }
  },

  actions: {
    async fetchCountry({ commit }) {
      const { data } = await this.$axios.get(`/common/country`)
      commit('setData', { name: 'country', data })
    }
  },

  getters: {
    snackbar(state) {
      return state.snackbar
    },
    alert(state) {
      return state.alert
    },
    appLoading(state) {
      return state.appLoading
    },
    breadCrumbs(state) {
      return state.breadCrumbs
    },
    country(state) {
      return state.country
    },
    feedback(state) {
      return state.feedback
    }
  }
}
