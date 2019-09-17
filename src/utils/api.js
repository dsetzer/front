import axios from 'axios'

// Automatically generates the api prefixes based on the object keys
const endpoints = routes => {
  const createdRoutes = {}
  Object.keys(routes).forEach(prefix => {
    // eg: convert chartPie to chart/pie
    const urlFriendly = prefix
      .split(/(?=[A-Z])/)
      .join('/')
      .toLowerCase()
    createdRoutes[prefix] = routes[prefix](
      `${window.env ? window.env.config.apiServer : ''}/api/${urlFriendly}`
      // `${
      //   process.env ? process.env.VUE_APP_API_BASE_URL : ''
      // }/api/${urlFriendly}`
    )
  })
  return createdRoutes
}

// Only call the fn once unless refresh is passed
// eg: api.chartPie.getTopFive(true) will refresh regardless if it was loaded previously
const singleton = fn => {
  let res = null
  return refresh => {
    if (refresh || !res) {
      res = fn()
    }
    return res
  }
}

// Get with no data
const get = route => () => axios.get(route, {})

// Any get endpoint that should be converted to a singleton
const getCached = route => singleton(get(route, {}))

const api = endpoints({
  auth: prefix => ({
    confirmEmail: token => axios.post(`${prefix}/confirm/${token}`),
    validateOauth: (email, username, token, provider) =>
      axios.post(`${prefix}/validate_oauth/`, {
        email,
        username,
        provider,
        oauth_token: token
      }),
    confirmResetPassword: (token, password) =>
      axios.post(`${prefix}/reset_password/${token}`, { password }),
    postResetPassword: email =>
      axios.post(`${prefix}/reset_password_token`, { email }),
    postSecondFactor: body => axios.post(`${prefix}/second_factor`, body)
  }),
  chartsPie: prefix => ({
    getAll: getCached(prefix)
  }),
  chartPieMcw: prefix => ({
    getTopFive: getCached(`${prefix}/top_five`),
    getTopTen: getCached(`${prefix}/top_ten`),
    getTopTwenty: getCached(`${prefix}/top_twenty`),
    getTopThirty: getCached(`${prefix}/top_thirty`),
    getTopFifty: getCached(`${prefix}/top_fifty`),
    getAll: getCached(prefix)
  }),
  chartPerformanceMcw: prefix => ({
    getTopFive: getCached(`${prefix}/top_five`),
    getTopTen: getCached(`${prefix}/top_ten`),
    getTopTwenty: getCached(`${prefix}/top_twenty`),
    getTopThirty: getCached(`${prefix}/top_thirty`),
    getTopFifty: getCached(`${prefix}/top_fifty`),
    getAll: getCached(prefix)
  }),
  chartPieEw: prefix => ({
    getTopFive: getCached(`${prefix}/top_five`),
    getTopTen: getCached(`${prefix}/top_ten`),
    getTopTwenty: getCached(`${prefix}/top_twenty`),
    getTopThirty: getCached(`${prefix}/top_thirty`),
    getTopFifty: getCached(`${prefix}/top_fifty`),
    getAll: getCached(prefix)
  }),
  chartPerformanceEw: prefix => ({
    getTopFive: getCached(`${prefix}/top_five`),
    getTopTen: getCached(`${prefix}/top_ten`),
    getTopTwenty: getCached(`${prefix}/top_twenty`),
    getTopThirty: getCached(`${prefix}/top_thirty`),
    getTopFifty: getCached(`${prefix}/top_fifty`),
    getAll: getCached(prefix)
  }),
  indices: prefix => ({
    getAll: getCached(prefix)
  }),
  faq: prefix => ({
    getContent: getCached(prefix)
  }),
  instructions: prefix => ({
    connection: getCached(`${prefix}/connection`),
    address: getCached(`${prefix}/address`),
    payment: getCached(`${prefix}/payment`),
    weight: getCached(`${prefix}/weight`),
    algos: getCached(`${prefix}/algos`)
  }),
  modes: prefix => ({
    getAll: getCached(prefix)
  }),
  products: prefix => ({
    getAll: getCached(prefix)
  }),
  supported_assets: prefix => ({
    getAll: getCached(prefix)
  }),
  supported_exchanges: prefix => ({
    getAll: getCached(prefix)
  }),
  supported_exchange_assets: prefix => ({
    getAll: getCached(prefix)
  }),
  supported_exchange_pairs: prefix => ({
    getAll: getCached(prefix)
  }),
  team: prefix => ({
    getContent: getCached(prefix)
  }),
  account: prefix => ({
    addAPI: body => axios.post(`${prefix}/api`, body),
    deleteAPI: body => axios.delete(`${prefix}/api`, body),
    availableAlgorithms: get(`${prefix}/available_algorithms`),
    availableExchanges: get(`${prefix}/available_exchanges`),
    balances: get(`${prefix}/balances`),
    invoices: get(`${prefix}/invoices`),
    payments: get(`${prefix}/payments`),
    paymentInBTC: body => axios.post(`${prefix}/payment/btc`, body),
    cpPayment: body => axios.post(`${prefix}/payment/coinpayments`, body),
    proUpgradeCost: get(`${prefix}/pro_upgrade_cost`),
    proUpgradePayment: get(`${prefix}/payment/pro_upgrade`),
    paymentStatus: get(`${prefix}/payment/status`),
    performance: get(`${prefix}/performance/daily`),
    saveEmail: body => axios.post(`${prefix}/save_email`, body),
    savePassword: body => axios.post(`${prefix}/save_password`, body),
    getSecondFactorSecret: get(`${prefix}/second_factor_secret`),
    addSecondFactor: body => axios.post(`${prefix}/save_second_factor`, body),
    removeSecondFactor: body =>
      axios.delete(`${prefix}/save_second_factor`, {
        data: body
      }),
    saveSetting: body => axios.post(`${prefix}/save_setting`, body),
    sendSupportEmail: body => axios.post(`${prefix}/send_support_email`, body),
    user: get(`${prefix}/user`),
    valuations: get(`${prefix}/valuations`)
  }),
  admin: prefix => ({
    billingStats: get(`${prefix}/billing_stats`),
    cubeStats: get(`${prefix}/cube_stats`),
    paidInvoices: get(`${prefix}/paid_invoices`),
    payments: get(`${prefix}/payments`),
    unpaidInvoices: get(`${prefix}/unpaid_invoices`),
    userStats: get(`${prefix}/user_stats`),
    users: get(`${prefix}/users`),
    loginAsUser: body => axios.post(`${prefix}/login_as_user`, body)
  }),
  cube: prefix => ({
    info: cubeId => axios.post(prefix, { cube_id: cubeId }),
    currentAllocations: cubeId =>
      axios.post(`${prefix}/allocations/current`, { cube_id: cubeId }),
    targetAllocations: cubeId =>
      axios.post(`${prefix}/allocations/target`, { cube_id: cubeId }),
    updateTargetAllocations: body =>
      axios.put(`${prefix}/allocations/target`, body),
    availableExAssets: cubeId =>
      axios.post(`${prefix}/available_ex_assets`, { cube_id: cubeId }),
    balances: cubeId => axios.post(`${prefix}/balances`, { cube_id: cubeId }),
    addConnection: body => axios.post(`${prefix}/connection`, body),
    updateConnection: body => axios.put(`${prefix}/connection`, body),
    deleteConnection: body => axios.delete(`${prefix}/connection`, body),
    getCostAverage: cubeId =>
      axios.post(`${prefix}/cost_average_items`, { cube_id: cubeId }),
    addCostAverage: body => axios.post(`${prefix}/cost_average`, body),
    deleteCostAverage: body => axios.delete(`${prefix}/cost_average`, body),
    exPairs: cubeId => axios.post(`${prefix}/ex_pairs`, { cube_id: cubeId }),
    performance: cubeId =>
      axios.post(`${prefix}/performance/daily`, { cube_id: cubeId }),
    saveSetting: body => axios.post(`${prefix}/save_setting`, body),
    // transactions: cubeId =>
    //   axios.post(`${prefix}/transactions_full`, { cube_id: cubeId }),
    transactions: cubeId =>
      axios.post(`${prefix}/transactions`, { cube_id: cubeId }),
    valuations: cubeId =>
      axios.post(`${prefix}/valuations`, { cube_id: cubeId })
  }),
  v1: prefix => ({
    candles: body => axios.post(`${prefix}/candles`, body),
    close1h: body => axios.post(`${prefix}/close_1h`, body),
    cubeDetails: body => axios.post(`${prefix}/cube_details`, body),
    getPortfolios: body => axios.post(`${prefix}/get_portfolios`, body),
    postAllocations: body => axios.post(`${prefix}/post_allocations`, body),
    priceCacher: body => axios.post(`${prefix}/price_cacher`, body),
    summary: body => axios.post(`${prefix}/summary`, body)
  }),
  wallet: prefix => ({
    new: body => axios.post(`${prefix}/new`, body),
    info: walletId => axios.post(prefix, { wallet_id: walletId }),
    currentAllocations: walletId =>
      axios.post(`${prefix}/allocations`, { wallet_id: walletId }),
    availableAssets: walletId =>
      axios.post(`${prefix}/available_ex_assets`, { wallet_id: walletId }),
    balances: walletId =>
      axios.post(`${prefix}/balances`, { wallet_id: walletId }),
    addAddress: body => axios.post(`${prefix}/external/address`, body),
    deleteAddress: body => axios.delete(`${prefix}/external/address`, body),
    getBlockchains: () => axios.get(`${prefix}/external/blockchains`),
    performance: walletId =>
      axios.post(`${prefix}/performance/daily`, { wallet_id: walletId }),
    saveSetting: body => axios.post(`${prefix}/save_setting`, body),
    transactions: walletId =>
      axios.post(`${prefix}/transactions`, { wallet_id: walletId }),
    valuations: walletId =>
      axios.post(`${prefix}/valuations`, { wallet_id: walletId })
  })
})

export default api
