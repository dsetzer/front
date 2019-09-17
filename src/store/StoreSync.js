// import { getDataInFn } from 'store/models';
import store from './store'

export default (models = {}) => {
  let route = null

  const computed = Object.keys(models).reduce((agg, key) => {
    // eslint-disable-next-line no-param-reassign
    agg[key] = () => store.getters.data[models[key](route).hash]
    return agg
  }, {})

  const loadData = to => {
    route = to
    Object.values(models).map(model => store.dispatch('loadModel', model(to)))
  }

  // Loop through every child component and run loadData
  const loadDataFromComponents = components => {
    // console.log(components)
    if (!components) {
      return
    }
    Object.keys(components).forEach(name => {
      const component = components[name]
      // console.log(component)
      if (component.extends && component.extends.routePropogater) {
        component.extends.routePropogater(route)
      }

      loadDataFromComponents(component.components)
    })
  }

  const loadDataFromRoute = (to, from, next) => {
    loadData(to)
    to.matched.forEach(match =>
      loadDataFromComponents(match.components.default.components)
    )
    next()
  }

  return {
    beforeRouteUpdate: loadDataFromRoute,
    beforeRouteEnter: loadDataFromRoute,
    routePropogater: loadData,
    computed,
    methods: {
      showSpinner() {
        store.commit('showSpinner', true)
      },
      hideSpinner() {
        store.commit('showSpinner', false)
      },
      clearCache(model) {
        store.commit('refreshDataInBg', model.hash)
        store.dispatch('loadModel', model)
      },
      clearCacheWithSpinner(model) {
        store.commit('clearData', model.hash)
        store.dispatch('loadModel', model)
      }
    }
  }
}
