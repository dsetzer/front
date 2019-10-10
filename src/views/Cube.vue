<template>
  <mdb-container fluid>
    <mdb-row>
      <mdb-col class="top" sm="12">
        <div>
          <mdb-card>
            <mdb-view cascade>
              <div class="header">
                <img class="icon" src="../assets/img/DASHBOARD.png" />
                <div class="header-text">
                  {{ cube.name }} |
                  <span>Dashboard</span>
                </div>
                <h6 class="alert">
                  API Connection
                  <mdb-tooltip v-if="isConnected" :options="{placement: 'left'}" trigger="hover">
                    <span slot="tip">The exchange API is successfully connected.</span>
                    <a slot="reference" class="active led" @click="toggleConnectModal"></a>
                  </mdb-tooltip>

                  <mdb-tooltip v-else :options="{placement: 'left'}" trigger="hover">
                    <span slot="tip">The exchange API cannot connect. Click to update.</span>
                    <a slot="reference" class="inactive" @click="toggleConnectModal"></a>
                  </mdb-tooltip>

                  <update-connect-modal
                    v-if="connectedExchange"
                    :exchange="connectedExchange"
                    :show-modal="showConnectModal"
                    :cube-id="cube.id"
                    @close="toggleConnectModal"
                  />
                </h6>
              </div>
            </mdb-view>
            <mdb-card-body>
              <template v-if="showBalances">
                <mdb-row>
                  <mdb-col sm="8" />
                  <mdb-col sm="4">
                    <mdb-btn
                      size="sm"
                      color="primary"
                      class="right mr-0"
                      @click.native="toggleCubeSettingsModal"
                    >Cube Settings</mdb-btn>
                  </mdb-col>
                </mdb-row>
                <mdb-row class="text-left">
                  <mdb-col sm="12">
                    <valuations
                      :val_fiat="fiatCurrentBalance"
                      :val_btc="bitcoinCurrentBalance"
                      :user="user"
                    />
                  </mdb-col>
                </mdb-row>
              </template>
            </mdb-card-body>
          </mdb-card>
          <br />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col sm="12">
        <div>
          <mdb-card>
            <mdb-view cascade>
              <div class="header">
                <img class="icon" src="../assets/img/PORTFOLIO.png" />
                <div class="header-text">
                  {{ cube.name }} |
                  <span>Portfolio</span>
                </div>
                <h6 class="alert">
                  Portfolio Status
                  <mdb-tooltip v-if="isRebalancing" :options="{placement: 'left'}" trigger="hover">
                    <span slot="tip">The trading engine is currently rebalancing your portfolio.</span>
                    <div slot="reference" class="processing" />
                  </mdb-tooltip>

                  <mdb-tooltip v-else :options="{placement: 'left'}" trigger="hover">
                    <span slot="tip">Your portfolio is balanced.</span>
                    <div slot="reference" class="active" />
                  </mdb-tooltip>
                </h6>
              </div>
            </mdb-view>
            <mdb-card-body>
              <template v-if="showBalances">
                <mdb-row class="text-center">
                  <balances-table
                    :are-allocations-editable="true"
                    :possible-allocations="exchangeSupportedAssets"
                    :rows="balances"
                    :target-allocations="targetAllocationPercents"
                    :total-fiat="fiatCurrentBalance"
                    :show-percent-off-goal="true"
                  />
                </mdb-row>
              </template>
              <div class="black-divider" />
              <template v-if="showCurrentAllocationPercents || showTargetAllocations">
                <br />
                <mdb-row>
                  <mdb-col lg="5" />
                  <mdb-col lg="7">
                    <span class="right">
                      <mdb-btn
                        v-show="!usingGenerator"
                        size="sm"
                        color="blue"
                        class="right mr-0"
                        @click.native="toggleGenerator"
                      >
                        Portfolio Generator
                        <i class="fas fa-chart-pie ml-1" />
                      </mdb-btn>
                      <mdb-btn
                        v-show="usingGenerator"
                        size="sm"
                        color="secondary"
                        class="mr-0"
                        @click.native="toggleGenerator"
                      >
                        Cancel
                        <i class="fa fa-close ml-1" />
                      </mdb-btn>
                    </span>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <generator-index v-show="usingGenerator"/>
                </mdb-row>
                <mdb-row v-show="!usingGenerator" class="text-center">
                  <mdb-col
                    v-if="showCurrentAllocationPercents"
                    :md="currentAllocationsChartColumnSpan"
                  >
                    <allocation-donut-pie-chart
                      :data="currentAllocations"
                      title="Current Allocations"
                    />
                  </mdb-col>
                  <mdb-col v-if="showTargetAllocations" md="6">
                    <allocation-donut-pie-chart
                      :data="targetAllocations"
                      title="Target Allocations"
                    />
                  </mdb-col>
                </mdb-row>
              </template>
            </mdb-card-body>
          </mdb-card>
          <br />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col sm="12">
        <div>
          <mdb-card>
            <mdb-view cascade>
              <div class="header">
                <img class="icon" src="../assets/img/TRADE.png" />
                <div class="header-text">
                  {{ cube.name }} |
                  <span>Trade Engine</span>
                </div>
                <toggle-button
                  :value="engineActive"
                  @input="handleTradingStatusChange"
                  class="alert"
                />
              </div>
            </mdb-view>
            <mdb-card-body v-show="engineActive">
              <mdb-container class="controls">
                <mdb-row>
                  <mdb-col />
                  <mdb-col sm="6">
                    <div class="d-flex align-items-center justify-content-between pt-4">
                      <p class="h5-responsive">Auto Rebalance</p>
                      <div>
                        <toggle-button
                          :value="cube.auto_rebalance"
                          @input="handleAutoRebalanceChange"
                        />
                      </div>
                    </div>
                  </mdb-col>
                  <mdb-col />
                </mdb-row>
                <div v-show="cube.auto_rebalance">
                  <mdb-row>
                    <div class="black-divider" />
                    <mdb-col>
                      <br />
                      <h5 class="h5-responsive">
                        Rebalance Frequency
                        <mdb-tooltip :options="{placement: 'right'}" trigger="hover">
                          <span
                            slot="tip"
                          >How often should the trading engine rebalance your portfolio?</span>
                          <i slot="reference" class="fa fa-question-circle" />
                        </mdb-tooltip>
                      </h5>
                      <app-select
                        v-model="selectedRebalanceFrequency"
                        :options="frequencyList"
                        placeholder="Select Frequency"
                        name="frequency"
                        class="mt-4"
                      />
                    </mdb-col>
                    <mdb-col>
                      <br />
                      <h5 class="h5-responsive">
                        Rebalance Threshold
                        <span>{{ percent }}%</span>
                        <mdb-tooltip :options="{placement: 'right'}" trigger="hover">
                          <span
                            slot="tip"
                          >How far from your allocation target should the engine allow an asset to drift before a rebalancing trade is made?</span>
                          <i slot="reference" class="fa fa-question-circle" />
                        </mdb-tooltip>
                      </h5>
                      <br />
                      <input
                        :min="1"
                        :max="100"
                        v-model="percent"
                        type="range"
                        class="custom-range"
                      />
                    </mdb-col>
                  </mdb-row>
                </div>
                <br />
                <div class="trigger">
                  <mdb-btn
                    size="lg"
                    color="secondary"
                    block
                    @click.native.prevent="triggerRebalance"
                  >Trigger Rebalance</mdb-btn>
                </div>
                <br />
                <p v-if="cube.balanced_at" class="trigger">Balanced: {{ balancedAt }}</p>
              </mdb-container>
            </mdb-card-body>
          </mdb-card>
          <br />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col sm="12">
        <div>
          <mdb-card>
            <mdb-view cascade>
              <div class="header">
                <img class="icon" src="../assets/img/CLOCK.png" />
                <div class="header-text">
                  {{ cube.name }} |
                  <span>Open Orders</span>
                </div>
              </div>
            </mdb-view>
            <mdb-card-body>
              <template v-if="showOpenOrders">
                <mdb-row class="text-center">
                  <open-orders-table :rows="openOrders" />
                </mdb-row>
              </template>
            </mdb-card-body>
          </mdb-card>
          <br />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col sm="12">
        <div>
          <mdb-card>
            <mdb-view cascade>
              <div class="header">
                <img class="icon" src="../assets/img/TRANSACTION.png" />
                <div class="header-text">
                  {{ cube.name }} |
                  <span>Transactions</span>
                </div>
              </div>
            </mdb-view>
            <mdb-card-body>
              <template v-if="showTransactions">
                <mdb-row class="text-center">
                  <transactions-table :rows="transactions" />
                </mdb-row>
              </template>
            </mdb-card-body>
          </mdb-card>
          <br />
        </div>
      </mdb-col>
    </mdb-row>

    <cube-settings-modal
      :show-modal="showCubeSettingsModal"
      :toggle-modal="toggleCubeSettingsModal"
    />
  </mdb-container>
</template>

<script>
import moment from 'moment'
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbBtn,
  mdbTooltip,
  mdbCard,
  mdbCardBody,
  mdbView
} from 'mdbvue'
import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import featureFlags from '@/utils/featureFlags'
import api from '@/utils/api'
import mapBalancesData from '@/utils/mapBalancesData'
import AllocationDonutPieChart from '@/components/charts/AllocationDonutPieChart'
import BalancesTable from '@/components/tables/BalancesTable'
import OpenOrdersTable from '@/components/tables/OpenOrdersTable'
import TransactionsTable from '@/components/tables/TransactionsTable'
import Valuations from '@/components/Valuations'
import AppSelect from '@/components/AppSelect'
import GeneratorIndex from '@/components/GeneratorIndex'
import UpdateConnectModal from '@/components/modals/UpdateConnectModal'
import CubeSettingsModal from '@/components/modals/CubeSettingsModal'

export default {
  name: 'CubeIndex',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbTooltip,
    mdbCard,
    mdbCardBody,
    mdbView,
    AllocationDonutPieChart,
    BalancesTable,
    OpenOrdersTable,
    TransactionsTable,
    Valuations,
    UpdateConnectModal,
    CubeSettingsModal,
    AppSelect,
    GeneratorIndex
  },
  extends: StoreSync({
    user: () => Models.USER(),
    cube: route => Models.CUBE_INFO(route.params.cubeID),
    availableExchangeAssets: route =>
      Models.CUBE_AVAIL_EX_ASSETS(route.params.cubeID),
    availableExchanges: () => Models.ACCOUNT_AVAIL_EXCHANGES(),
    balancesUnmapped: route => Models.CUBE_BALANCES(route.params.cubeID),
    transactions: route => Models.CUBE_TRANSACTIONS(route.params.cubeID)
  }),
  data() {
    return {
      showConnectModal: false,
      showCubeSettingsModal: false,
      showRogueDetectionModal: false,
      usingGenerator: false,
      featureFlags,
      frequencies: [
        [3600, 'Hourly'],
        [86400, 'Daily'],
        [604800, 'Weekly'],
        [2412900, 'Monthly']
      ]
    }
  },
  computed: {
    //
    // Chart Column Spans
    //
    currentAllocationsChartColumnSpan() {
      return '6'
    },
    performanceChartColumnSpan() {
      return this.user.wide_charts ? '12' : '6'
    },
    //
    // Flags
    //
    isCentaur() {
      return this.cube.algorithm.name === 'Centaur'
    },
    isConnected() {
      return !this.cube.api_connections[0].failed_at
    },
    isRebalancing() {
      return this.cube.is_rebalancing
    },
    isAuto() {
      return this.cube.auto_rebalance
    },
    //
    // Tools
    //
    percent: {
      get() {
        return this.cube.threshold
      },
      set(value) {
        this.handleRebalanceThresholdChange(value)
      }
    },
    engineActive: {
      get() {
        if (this.cube.trading_status === 'live') {
          return true
        }
        return false
      },
      set(value) {
        console.log(value)
        this.handleTradingStatusChange(value)
      }
    },
    selectedRebalanceFrequency: {
      get() {
        return this.cube.rebalance_interval
      },
      set(value) {
        this.handleRebalanceFrequencyChange(value)
      }
    },
    balancedAt() {
      const d = moment(String(this.cube.balanced_at)).format('MM/DD/YYYY hh:mm')
      return d
    },
    showBalances() {
      return (
        this.balances &&
        this.balances.length > 0 &&
        this.exchangeSupportedAssets &&
        this.exchangeSupportedAssets.length > 0 &&
        this.targetAllocationPercents &&
        this.targetAllocationPercents.length > 0
      )
    },
    showCurrentAllocationPercents() {
      return (
        this.currentAllocationPercents &&
        this.currentAllocationPercents.length > 0
      )
    },
    showFiatOnly() {
      return !this.user.btc_data
    },
    showOpenOrders() {
      return this.openOrders && this.openOrders.length > 0
    },
    showPerformances() {
      if (
        this.bitcoinPerformanceBalances &&
        this.bitcoinPerformanceBalances.length > 0 &&
        this.bitcoinPerformancePercents &&
        this.bitcoinPerformancePercents.length > 0 &&
        this.fiatPerformanceBalances &&
        this.fiatPerformanceBalances.length > 0 &&
        this.fiatPerformancePercents &&
        this.fiatPerformancePercents.length > 0
      ) {
        return true
      }
      return false
    },
    showTargetAllocations() {
      return (
        this.targetAllocationPercents &&
        this.targetAllocationPercents.length > 0
      )
    },
    showTransactions() {
      return this.transactions.length > 0
    },
    //
    // Lists
    //
    balances() {
      return this.balancesUnmapped.balances &&
        this.balancesUnmapped.balances.values
        ? mapBalancesData(this.balancesUnmapped.balances.values)
        : null
    },
    currentAllocations() {
      return this.balancesUnmapped.current_allocations
    },
    targetAllocations() {
      return this.balancesUnmapped.target_allocations
    },
    currentAllocationPercents() {
      return this.currentAllocations
    },
    exchangeSupportedAssets() {
      return this.availableExchangeAssets.supported_assets
    },
    openOrders() {
      return this.cube.orders
    },
    targetAllocationPercents() {
      if (!this.targetAllocations || !this.targetAllocations.length) {
        return this.currentAllocations
      }
      return this.targetAllocations
    },
    frequencyList() {
      return this.frequencies.map(frequency => ({
        label: frequency[1],
        value: frequency[0]
      }))
    },
    //
    // Single Values
    //
    bitcoinCurrentBalance() {
      return this.balancesUnmapped.total.btc
    },
    bitcoinCurrentPercent() {
      return this.bitcoinPerformancePercents.slice(-1).pop()[1]
    },
    connectedExchange() {
      const connectedExchange = this.cube.api_connections[0].exchange

      const matchedExchange =
        connectedExchange &&
        this.availableExchanges.find(
          exchange => exchange.name === connectedExchange.name
        )

      return { ...(connectedExchange || {}), ...(matchedExchange || {}) }
    },
    cubeId() {
      return this.cube.id
    },
    fiatCurrentBalance() {
      return this.balancesUnmapped.total.fiat
    },
    fiatCurrentPercent() {
      return this.fiatPerformancePercents.slice(-1).pop()[1]
    },
    fiatSymbol() {
      return this.user.fiat.symbol
    }
  },
  methods: {
    //
    // Model toogles
    //
    toggleConnectModal() {
      this.showConnectModal = !this.showConnectModal
    },
    toggleCubeSettingsModal() {
      this.showCubeSettingsModal = !this.showCubeSettingsModal
    },
    toggleGenerator() {
      this.usingGenerator = !this.usingGenerator
    },
    //
    // Trade Engine Controls
    //
    saveChange({ name, value }) {
      return api.cube.saveSetting({
        name: name.toString(),
        value: value.toString(),
        cube_id: this.cube.id
      })
    },
    handleTradingStatusChange(value) {
      let valueFinal = ''
      if (value === true) {
        valueFinal = 'live'
      } else {
        valueFinal = 'off'
      }
      this.cube.trading_status = valueFinal
      this.saveChange({
        name: 'trading_status',
        value: valueFinal
      })
    },
    handleAutoRebalanceChange(value) {
      this.cube.auto_rebalance = value
      this.saveChange({
        name: 'auto_rebalance',
        value
      })
    },
    handleRebalanceThresholdChange(value) {
      this.cube.threshold = value
      this.saveChange({
        name: 'threshold',
        value
      })
    },
    handleRebalanceFrequencyChange(value) {
      this.cube.rebalance_interval = value
      this.saveChange({
        name: 'rebalance_interval',
        value
      })
    },
    async triggerRebalance() {
      let toast = this.$toasted.info('Triggering rebalance...')

      try {
        await api.cube.saveSetting({
          name: 'trigger_rebalance',
          value: '',
          cube_id: this.cube.id
        })

        toast.goAway()
        toast = this.$toasted.success('Rebalance triggered!')
      } catch (error) {
        console.log(error)
        toast.goAway()
        toast = this.$toasted.error('Could not trigger rebalance.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.top {
  text-align: left;
}

.black-divider {
  width: 100%;
  height: 1px;
  margin-top: 14px;
  background-color: #000000;
}
.buttons {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
}
.active,
.processing,
.inactive {
  display: inline-block;
  margin-left: 5px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-bottom: 0px;
  margin-right: 20px;
}
.active {
  background: $coincube-green;
}
.processing {
  background: $coincube-orange;
}
.inactive {
  background: $coincube-error;
  cursor: pointer;
}
h3 {
  font-weight: 300;
  padding-top: 10px;
  font-size: 40px;
}
h3 span {
  color: $coincube-accent;
}
h6 {
  padding-bottom: 6px;
  display: inline-block;
}
.header-text {
  padding-left: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 300;
  text-align: left;
  display: inline-block;
}
.header-text span {
  color: $coincube-accent;
}
.icon {
  margin-left: 30px;
  margin-top: 18px;
  max-width: 40px;
  display: table-cell;
  float: left;
}
.view {
  background-color: $coincube-white;
}
.trigger {
  text-align: center;
}
.controls {
  max-width: 800px;
}
.alert {
  padding-right: 20px;
  margin-top: 15px;
  float: right;
}
.led {
  cursor: pointer;
}
.right {
  float: right;
}
h5 span i {
  font-size: 14px;
}
</style>
