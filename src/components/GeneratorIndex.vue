<template>
  <mdb-container fluid>
    <div class="generator-wrapper">
      <div>
        <mdb-row>
          <mdb-col lg="12">
            <instruction-header title="Choose a Blockchain Index" />
          </mdb-col>
        </mdb-row>

        <template v-if="charts">
          <mdb-row class="mt-4">
            <div v-for="(chart, index) in charts" :key="index">
              <app-select-index
                :chart="chart"
                :on-click="handleIndexClick"
                :selected="chartIndexType === chart.index_type"
                :title="chart.index_type | toTitle"
              />
            </div>
          </mdb-row>
          <div class="black-divider" />
        </template>

        <mdb-row v-if="showRiskToleranceSlider" class="mt-4">
          <mdb-col>
            <risk-tolerance-slider
              ref="riskToleranceSlider"
              :available-exchange-assets="availableExchangeAssets"
              :cube="cube"
              :fiat-valuation="fiatCurrentBalance"
              :initial-indices="indices"
            />
          </mdb-col>
        </mdb-row>
      </div>
    </div>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from 'mdbvue'
import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import mapBalancesData from '@/utils/mapBalancesData'
import api from '@/utils/api'
import AppSelectIndex from './AppSelectIndex'
import BalancesTable from './tables/BalancesTable'
import InstructionHeader from './InstructionHeader'
import RiskToleranceSlider from './RiskToleranceSlider'

export default {
  name: 'GeneratorIndex',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    AppSelectIndex,
    InstructionHeader,
    RiskToleranceSlider,
    BalancesTable
  },
  filters: {
    toTitle(chartIndexType) {
      if (!chartIndexType || chartIndexType === '') return ''

      const words = chartIndexType.split('_')
      const newWords = []

      for (let i = 0, length = words.length; i < length; i++) {
        const word = words[i]
        newWords[i] = word.charAt(0).toUpperCase() + word.substr(1)
      }

      return newWords.join(' ')
    }
  },
  extends: StoreSync({
    user: () => Models.USER(),
    availableExchangeAssets: route =>
      Models.CUBE_AVAIL_EX_ASSETS(route.params.cubeID),
    cube: route => Models.CUBE_INFO(route.params.cubeID),
    indicesUnmapped: route => Models.INDICES(route.params.cubeID),
    balancesUnmapped: route => Models.CUBE_BALANCES(route.params.cubeID)
  }),
  data() {
    return {
      showInstructionsModal: false,
      instructions: null,
      charts: null,
      tab: '1'
    }
  },
  computed: {
    fiatCurrentBalance() {
      return this.balancesUnmapped.total.fiat
    },
    bitcoinCurrentBalance() {
      return this.balancesUnmapped.total.fiat
    },
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
    targetAllocationPercents() {
      if (!this.targetAllocations || !this.targetAllocations.length) {
        return this.currentAllocations
      }
      return this.targetAllocations
    },
    exchangeSupportedAssets() {
      return this.availableExchangeAssets.supported_assets
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
    indices() {
      return new Map(this.indicesUnmapped).get(this.chartIndexType)
    },
    showRiskToleranceSlider() {
      return (
        this.availableExchangeAssets.supported_assets &&
        this.availableExchangeAssets.supported_assets.length > 0 &&
        this.indices &&
        this.balancesUnmapped.total.fiat
      )
    },
    chartIndexType: {
      get() {
        return this.cube.index.type
      },
      set(value) {
        this.cube.index.type = value
      }
    }
  },
  mounted() {
    this.getCharts()
  },
  methods: {
    async getCharts() {
      const { data } = await api.chartsPie.getAll()
      this.charts = data
    },
    async handleIndexClick(indexType) {
      this.chartIndexType = indexType
      const chart = this.$refs.riskToleranceSlider.updateIndices(this.indices)

      if (!this.$refs.riskToleranceSlider.areAllocationsAvailable) return

      let toast = this.$toasted.info('Updating cube allocations...')

      try {
        await api.cube.updateTargetAllocations({
          cube_id: this.$route.params.cubeID,
          new_allocations: chart
        })
        await api.cube.saveSetting({
          name: 'index',
          value: indexType,
          cube_id: this.cube.id
        })

        // this.clearCache(Models.USER())
        this.clearCache(Models.CUBE_BALANCES(this.$route.params.cubeID))
        this.clearCache(Models.CUBE_INFO(this.$route.params.cubeID))
        this.clearCache(
          Models.CUBE_ALLOCATIONS_TARGET(this.$route.params.cubeID)
        )
        toast.goAway()
        toast = this.$toasted.success('Cube allocations updated!')
      } catch (error) {
        toast.goAway()
        toast = this.$toasted.error('Could not update cube allocations.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

// .black-divider {
//   width: 100%;
//   height: 1px;
//   margin-top: 14px;
//   background-color: #000000;
// }
.back-to-cube-btn {
  margin: 1em auto 1em auto;

  @media (min-width: 768px) {
    margin: 5em auto 5em auto;
  }
}

.slide-toggle-enter-active {
  transition: 0.3s ease-in;
  opacity: 1;
  max-height: 500px;
}
.slide-toggle-enter,
.slide-toggle-leave-active {
  opacity: 0;
  max-height: 0;
}
.slide-toggle-leave {
  opacity: 1;
  max-height: 500px;
}

// .border-bottom {
//   border-bottom-width: 3px !important;
// }

.tab-trigger {
  float: left;
}

.generator-wrapper /deep/ .classic-tabs li a.active {
  color: $coincube-accent;
  border-bottom: 3px solid $coincube-accent;
  font-weight: bold;
}
</style>
