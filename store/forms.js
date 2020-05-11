import findObjectIndex from '@/assets/js/helper'

const defaultFormsState = () => {
  return {
    data: [],
    pagination: {
      lastPage: 1,
      page: 1,
      perPage: 10,
      total: 0
    }
  }
}
export default {
  namespaced: true,
  state: defaultFormsState,

  mutations: {
    setData(state, obj) {
      state[obj.name] = obj.data
    },
    updateData(state, obj) {
      state.data.splice(obj.index, 1, obj.data)
    },
    addData(state, obj) {
      state[obj.name].unshift(obj.data)
    },
    resetState(state) {
      Object.assign(state, defaultFormsState())
    }
  },

  actions: {
    async show({ commit }, obj) {
      const { data } = await this.$axios.get(`/forms/${obj.id}`)
      commit('addData', { name: 'data', data })
    },
    async update({ commit, state }, obj) {
      const data = await this.$axios.$put(`/forms/${obj.id}`, obj)
      const index = findObjectIndex(state.data, data)
      commit('updateData', { data, index })
    },
    async index({ commit }, obj) {
      const { data } = await this.$axios.get(`forms`, { params: obj })
      const listItem = data.data
      const pagination = data
      commit('setData', { name: 'data', data: listItem })
      delete pagination.data
      commit('setData', { name: 'pagination', data: pagination })
    }
  },

  getters: {
    getData(state) {
      return state.data
    },
    getPagination(state) {
      return state.pagination
    }
  }
}
