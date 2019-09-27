<template>
  <mdb-container fluid>
    <mdb-row v-if="!areAllocationsAvailable">
      <mdb-col class="text-center">
        <h4>Please add more funds to your account to create a portfolio with this number of assets. You will need 100 {{ user.fiat.symbol }}/per asset. Your current account balance is {{ fiatValuationRounded }} {{ user.fiat.symbol }}</h4>
      </mdb-col>
    </mdb-row>

    <mdb-row v-else>
      <mdb-col class="slider-container" sm="4">
        <h6 class="right slider-label">MARKET CAP WEIGHTED</h6>
      </mdb-col>

      <mdb-col class="slider-container" sm="4">
        <h3 class="h3-responsive">
          Asset Weighting |
          <span>{{ weight }}</span>
        </h3>
        <input
          :min="1"
          :max="10"
          v-model="weight"
          type="range"
          class="custom-range slider"
          @change="commitWeight"
          @input="previewWeight"
        />
      </mdb-col>

      <mdb-col class="slider-container" sm="4">
        <h6 class="left slider-label">EQUALLY WEIGHTED</h6>
      </mdb-col>

      <mdb-col class="allocation-chart-container" sm="12">
        <allocation-donut-pie-chart
          v-if="chartAllocations"
          :key="chartAllocations.id"
          :data="chartAllocations"
          title="Asset Allocations"
        />
      </mdb-col>
    </mdb-row>

    <instructions-modal
      v-if="instructions"
      :modal-content="instructions"
      :show-modal="showInstructionsModal"
      :toggle-modal="toggleInstructionsModal"
    />
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue'
import StoreSync from '@/store/StoreSync'
import Models from '@/store/models'
import api from '@/utils/api'
import precisionRound from '@/utils/precisionRound'
import AllocationDonutPieChart from './charts/AllocationDonutPieChart'
import InstructionHeader from './InstructionHeader'
import InstructionsModal from './modals/InstructionsModal'

export default {
  name: 'RiskToleranceSlider',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    AllocationDonutPieChart,
    InstructionHeader,
    InstructionsModal
  },
  extends: StoreSync({
    user: () => Models.USER()
  }),
  props: {
    availableExchangeAssets: {
      type: Object,
      required: true
    },
    cube: {
      type: Object,
      required: true
    },
    fiatValuation: {
      type: Number,
      required: true
    },
    initialIndices: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      areAllocationsAvailable: false,
      chartAllocations: null,
      indices: null,
      instructions: null,
      showInstructionsModal: false,
      oldWeight: 0,
      weight: 0
    }
  },
  computed: {
    fiatValuationRounded() {
      return precisionRound(this.fiatValuation, 2)
    }
  },
  mounted() {
    this.indices = this.initialIndices
    this.weight = this.cube.risk_tolerance
    this.oldWeight = this.weight
    this.updateChart()
    this.getInstructions()
  },
  methods: {
    // updateIndices is meant to be public
    updateIndices(indices) {
      this.indices = indices
      return this.updateChart()
    },
    // the rest of the methods are meant to be private
    async getInstructions() {
      const { data } = await api.instructions.weight()
      this.instructions = data
    },
    toggleInstructionsModal() {
      this.showInstructionsModal = !this.showInstructionsModal
    },
    previewWeight() {
      if (this.weight === this.oldWeight) return

      this.oldWeight = this.weight

      this.updateChart()
    },
    updateChart() {
      let allocations = this.getPossibleAllocations()
      allocations = this.allocationsByWeight(allocations)
      allocations = this.filterAllocationByMin(allocations)

      this.chartAllocations = this.createChartAllocations(allocations)
      this.areAllocationsAvailable = this.chartAllocations.length > 0
      return this.chartAllocations
    },
    getPossibleAllocations() {
      const possibleAllocations = this.indices

      // Filter list by assets actually supported by Cube exchange
      Object.keys(possibleAllocations).forEach(asset => {
        if (!this.availableExchangeAssets.supported_assets.includes(asset)) {
          delete possibleAllocations[asset]
        }
      })

      return this.correctAllocations(possibleAllocations)
    },
    correctAllocations(allocations) {
      let totalPercent = 0
      const newAllocations = {}

      Object.keys(allocations).forEach(asset => {
        totalPercent += allocations[asset]
      })

      const correction = 1 / totalPercent

      Object.keys(allocations).forEach(asset => {
        newAllocations[asset] = allocations[asset] * correction
      })

      return newAllocations
    },
    allocationsByWeight(allocations) {
      const riskOn = this.weight * 0.1
      const riskOff = 1 - riskOn
      const assetsEqualPercent = 1 / Object.keys(allocations).length
      const newAllocations = {}

      Object.keys(allocations).forEach(asset => {
        newAllocations[asset] =
          allocations[asset] * riskOff + assetsEqualPercent * riskOn
      })

      return newAllocations
    },
    filterAllocationByMin(allocations) {
      const min = 50
      let newAllocations = allocations

      Object.keys(allocations).forEach(asset => {
        const assetValue = allocations[asset] * this.fiatValuation
        if (assetValue < min) {
          delete newAllocations[asset]
          newAllocations = this.correctAllocations(newAllocations)
          newAllocations = this.filterAllocationByMin(newAllocations)
        }
        return newAllocations
      })

      return newAllocations
    },
    createChartAllocations(allocations) {
      const chartAllocations = []

      Object.keys(allocations).forEach(asset => {
        if (allocations[asset] > 0) {
          chartAllocations.push({
            name: asset,
            y: allocations[asset]
          })
        }
      })

      return chartAllocations
    },
    async commitWeight() {
      let toast = this.$toasted.info('Updating cube allocations...')

      try {
        await api.cube.saveSetting({
          name: 'risk_tolerance',
          value: this.weight,
          cube_id: this.cube.id
        })
        await api.cube.updateTargetAllocations({
          cube_id: this.$route.params.cubeID,
          new_allocations: this.chartAllocations
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

.slider-container {
  text-align: center;
  margin-top: 10px;
  padding: 15px;
  background-color: $coincube-white;
}
.allocation-chart-container {
  text-align: center;
  padding: 1em;
}
.slider-label {
  margin-top: 48px;
}
.right {
  text-align: right;
}
.left {
  text-align: left;
}
.slider {
  padding-top: 24px;
}
h4 {
  margin-top: 40px;
}
</style>
