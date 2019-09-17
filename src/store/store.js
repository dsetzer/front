import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const LoadingStatus = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  LOADED: 'LOADED'
}

export default new Vuex.Store({
  state: {
    status: {},
    data: {},
    toReload: {},
    showSpinner: false,
    error: false
  },
  mutations: {
    setStatus(state, { hash, status }) {
      Vue.set(state.status, hash, status)
    },
    setData(state, { hash, data }) {
      Vue.set(state.status, hash, LoadingStatus.LOADED)
      Vue.set(state.data, hash, data)
      Vue.set(state.toReload, hash, false)
    },
    clearData(state, hash) {
      Vue.set(state.status, hash, LoadingStatus.NONE)
      Vue.set(state.data, hash, undefined)
    },
    refreshDataInBg(state, hash) {
      Vue.set(state.toReload, hash, true)
    },
    showSpinner(state, show) {
      state.showSpinner = show
    },
    error(state) {
      // This usually only ever happens if the server is down
      state.error = true
    },
    logout(state) {
      state.status = {}
      state.data = {}
    }
  },
  actions: {
    loadModel({ commit, state }, model) {
      const hash = model.hash

      const loaded =
        state.status[hash] && state.status[hash] !== LoadingStatus.NONE
      const toReload = state.toReload[hash]

      // Return if data is already loaded or loading
      if (loaded && !toReload) {
        return
      }

      if (!toReload) {
        commit('setStatus', { hash, status: LoadingStatus.LOADING })
      }

      // eslint-disable-next-line consistent-return
      return model
        .fetchData()
        .then(res => commit('setData', { hash, data: res }))
        .catch(e => {
          console.error(e)
          // This usually only ever happens if the server is down
          commit('error')
          commit('setStatus', { hash, status: LoadingStatus.NONE })
        })
    }
  },
  getters: {
    isDataLoaded(state) {
      // If cannot find data that isn't loaded, then everything is loaded
      return !Object.keys(state.status).find(
        key => state.status[key] !== LoadingStatus.LOADED
      )
    },
    errorOccured(state) {
      return state.error
    },
    showSpinner(state) {
      return state.showSpinner
    },
    data(state) {
      return state.data
    }
  }
})
