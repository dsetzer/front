import api from '@/utils/api'

// The hash is used to cache the data

const USER = () => ({
  hash: 'USER',
  fetchData() {
    return api.account.user().then(r => r.data)
  }
})

const ACCOUNT_BALANCES_AND_ALLOCATIONS = () => ({
  hash: 'ACCOUNT_BALANCES_AND_ALLOCATIONS',
  fetchData() {
    return api.account.balances().then(r => r.data)
  }
})

const ACCOUNT_INVOICES = () => ({
  hash: 'ACCOUNT_INVOICES',
  fetchData() {
    return api.account.invoices().then(r => r.data)
  }
})

const ACCOUNT_PAYMENTS = () => ({
  hash: 'ACCOUNT_PAYMENTS',
  fetchData() {
    return api.account.invoices().then(r => r.data)
  }
})

const ACCOUNT_PAYMENT_STATUS = () => ({
  hash: 'ACCOUNT_PAYMENT_STATUS',
  fetchData() {
    return api.account.paymentStatus().then(r => r.data)
  }
})

const ACCOUNT_PERFORMANCE = () => ({
  hash: 'ACCOUNT_PERFORMANCE',
  fetchData() {
    return api.account.performance().then(r => r.data)
  }
})

const ACCOUNT_PRO_UPGRADE_COST = () => ({
  hash: 'ACCOUNT_PRO_UPGRADE_COST',
  fetchData() {
    return api.account.proUpgradeCost().then(r => r.data)
  }
})

const ACCOUNT_VALUATIONS = () => ({
  hash: 'ACCOUNT_VALUATIONS',
  fetchData() {
    return api.account.valuations().then(r => r.data)
  }
})

const ACCOUNT_AVAIL_EXCHANGES = () => ({
  hash: 'ACCOUNT_AVAIL_EXCHANGES',
  fetchData() {
    return api.account.availableExchanges().then(r => r.data)
  }
})

const ADMIN_BILLING_STATS = () => ({
  hash: 'ADMIN_BILLING_STATS',
  fetchData() {
    return api.admin.billingStats().then(r => r.data)
  }
})

const ADMIN_CUBE_STATS = () => ({
  hash: 'ADMIN_CUBE_STATS',
  fetchData() {
    return api.admin.cubeStats().then(r => r.data)
  }
})

const ADMIN_PAID_INVOICES = () => ({
  hash: 'ADMIN_PAID_INVOICES',
  fetchData() {
    return api.admin.paidInvoices().then(r => r.data)
  }
})

const ADMIN_PAYMENTS = () => ({
  hash: 'ADMIN_PAYMENTS',
  fetchData() {
    return api.admin.payments().then(r => r.data)
  }
})

const ADMIN_UNPAID_INVOICES = () => ({
  hash: 'ADMIN_UNPAID_INVOICES',
  fetchData() {
    return api.admin.unpaidInvoices().then(r => r.data)
  }
})

const ADMIN_USER_STATS = () => ({
  hash: 'ADMIN_USER_STATS',
  fetchData() {
    return api.admin.userStats().then(r => r.data)
  }
})

const ADMIN_USERS = () => ({
  hash: 'ADMIN_USERS',
  fetchData() {
    return api.admin.users().then(r => r.data)
  }
})

const CUBE_INFO = cubeId => ({
  hash: `CUBE_INFO:${cubeId}`,
  fetchData() {
    return api.cube.info(cubeId).then(r => r.data)
  }
})

const CUBE_ALLOCATIONS_CURRENT = cubeId => ({
  hash: `CUBE_ALLOCATIONS_CURRENT:${cubeId}`,
  fetchData() {
    return api.cube.currentAllocations(cubeId).then(r => r.data)
  }
})

const CUBE_ALLOCATIONS_TARGET = cubeId => ({
  hash: `CUBE_ALLOCATIONS_TARGET:${cubeId}`,
  fetchData() {
    return api.cube.targetAllocations(cubeId).then(r => r.data)
  }
})

const CUBE_AVAIL_EX_ASSETS = cubeId => ({
  hash: `CUBE_AVAIL_EX_ASSETS:${cubeId}`,
  fetchData() {
    return api.cube.availableExAssets(cubeId).then(r => r.data)
  }
})

const CUBE_BALANCES = cubeId => ({
  hash: `CUBE_BALANCES:${cubeId}`,
  fetchData() {
    return api.cube.balances(cubeId).then(r => r.data)
  }
})

const CUBE_COST_AVERAGE_ORDERS = cubeId => ({
  hash: `CUBE_COST_AVERAGE_ORDERS:${cubeId}`,
  fetchData() {
    return api.cube.getCostAverage(cubeId).then(r => r.data)
  }
})

const CUBE_EX_PAIRS = cubeId => ({
  hash: `CUBE_EX_PAIRS:${cubeId}`,
  fetchData() {
    return api.cube.exPairs(cubeId).then(r => r.data)
  }
})

const CUBE_PERFORMANCE = cubeId => ({
  hash: `CUBE_PERFORMANCE:${cubeId}`,
  fetchData() {
    return api.cube.performance(cubeId).then(r => r.data)
  }
})

const CUBE_TRANSACTIONS = cubeId => ({
  hash: `CUBE_TRANSACTIONS:${cubeId}`,
  fetchData() {
    return api.cube
      .transactions(cubeId)
      .then(r => r.data)
      .catch(() => [])
  }
})

const CUBE_VALUATIONS = cubeId => ({
  hash: `CUBE_VALUATIONS:${cubeId}`,
  fetchData() {
    return api.cube.valuations(cubeId).then(r => r.data)
  }
})

const INDICES = () => ({
  hash: 'INDICES',
  fetchData() {
    return api.indices.getAll().then(r => r.data)
  }
})

const PRODUCTS = () => ({
  hash: 'PRODUCTS',
  fetchData() {
    return api.products.getAll().then(r => r.data)
  }
})

const SUPPORTED_EXCHANGES = () => ({
  hash: 'SUPPORTED_EXCHANGES',
  fetchData() {
    return api.supported_exchanges.getAll().then(r => r.data)
  }
})

const WALLET_INFO = walletId => ({
  hash: `WALLET_INFO:${walletId}`,
  fetchData() {
    return api.wallet.info(walletId).then(r => r.data)
  }
})

const WALLET_ALLOCATIONS = walletId => ({
  hash: `WALLET_ALLOCATIONS:${walletId}`,
  fetchData() {
    return api.wallet.currentAllocations(walletId).then(r => r.data)
  }
})

const WALLET_AVAIL_ASSETS = walletId => ({
  hash: `WALLET_AVAIL_ASSETS:${walletId}`,
  fetchData() {
    return api.wallet.availableAssets(walletId).then(r => r.data)
  }
})

const WALLET_BALANCES = walletId => ({
  hash: `WALLET_BALANCES:${walletId}`,
  fetchData() {
    return api.wallet.balances(walletId).then(r => r.data)
  }
})

const WALLET_PERFORMANCE = walletId => ({
  hash: `WALLET_PERFORMANCE:${walletId}`,
  fetchData() {
    return api.wallet.performance(walletId).then(r => r.data)
  }
})

const WALLET_TRANSACTIONS = walletId => ({
  hash: `WALLET_TRANSACTIONS:${walletId}`,
  fetchData() {
    return api.wallet.transactions(walletId).then(r => r.data)
    // .catch(() => []);
  }
})

const WALLET_VALUATIONS = walletId => ({
  hash: `WALLET_VALUATIONS:${walletId}`,
  fetchData() {
    return api.wallet.valuations(walletId).then(r => r.data)
  }
})

const WALLET_BLOCKCHAINS = () => ({
  hash: `WALLET_BLOCKCHAINS`,
  fetchData() {
    return api.wallet.getBlockchains().then(r => r.data)
  }
})

export default {
  USER,
  ACCOUNT_BALANCES_AND_ALLOCATIONS,
  ACCOUNT_VALUATIONS,
  ACCOUNT_INVOICES,
  ACCOUNT_PAYMENTS,
  ACCOUNT_PAYMENT_STATUS,
  ACCOUNT_PERFORMANCE,
  ACCOUNT_PRO_UPGRADE_COST,
  ACCOUNT_AVAIL_EXCHANGES,
  ADMIN_BILLING_STATS,
  ADMIN_CUBE_STATS,
  ADMIN_PAID_INVOICES,
  ADMIN_PAYMENTS,
  ADMIN_UNPAID_INVOICES,
  ADMIN_USERS,
  ADMIN_USER_STATS,
  CUBE_INFO,
  CUBE_ALLOCATIONS_CURRENT,
  CUBE_ALLOCATIONS_TARGET,
  CUBE_AVAIL_EX_ASSETS,
  CUBE_BALANCES,
  CUBE_COST_AVERAGE_ORDERS,
  CUBE_EX_PAIRS,
  CUBE_PERFORMANCE,
  CUBE_TRANSACTIONS,
  CUBE_VALUATIONS,
  INDICES,
  PRODUCTS,
  SUPPORTED_EXCHANGES,
  WALLET_INFO,
  WALLET_ALLOCATIONS,
  WALLET_AVAIL_ASSETS,
  WALLET_BALANCES,
  WALLET_PERFORMANCE,
  WALLET_TRANSACTIONS,
  WALLET_VALUATIONS,
  WALLET_BLOCKCHAINS
}
