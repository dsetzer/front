<template>
  <mdb-container class="table-wrapper nw-balances-table">
    <mdb-row>
      <mdb-col lg="1" class="switch">
        <toggle-button v-model="isFiat" :labels="{checked: 'Fiat', unchecked: 'BTC'}" />
      </mdb-col>
      <mdb-col lg="11">
        <template v-if="areAllocationsEditable">
          <mdb-btn
            v-if="!editingAllocations"
            size="sm"
            color="blue-grey"
            class="right mr-0"
            @click.native="startEdit"
          >
            Edit Allocations
            <i class="fas fa-pencil-alt ml-1" />
          </mdb-btn>
          <span v-else class="right">
            <mdb-btn size="sm" color="blue-grey" @click.native="showAssetsModal = true">
              Add Asset
              <i class="fa fa-plus ml-1" />
            </mdb-btn>
            <mdb-btn size="sm" color="primary" @click.native="savePercents">
              Save
              <i class="fa fa-check ml-1" />
            </mdb-btn>
            <mdb-btn size="sm" color="secondary" class="mr-0" @click.native="cancelEdit">
              Cancel
              <i class="fa fa-close ml-1" />
            </mdb-btn>
          </span>
        </template>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <datatable id="balances" :columns="columns" :data="allRows" />
    </mdb-row>
    <assets-modal
      v-if="unselectedAssets"
      :show-modal="showAssetsModal"
      :assets="unselectedAssets"
      @select="addAsset"
      @close="showAssetsModal = false"
    />
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from 'mdbvue'
import api from '@/utils/api'
import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import Spinner from '@/components/Spinner'
import AssetsModal from '@/components/modals/AssetsModal'
import AssetColumn from '../columns/AssetColumn'
import ColumnRemoveAsset from '../columns/ColumnRemoveAsset'
import ConditionalFormatPercentColumn from '../columns/ConditionalFormatPercentColumn'
import PercentColumn from '../columns/PercentColumn'
import Precision2Column from '../columns/Precision2Column'
import PercentSliderColumn from '../columns/PercentSliderColumn'
import Precision8Column from '../columns/Precision8Column'

export default {
  name: 'BalancesTable',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    Spinner,
    AssetColumn,
    ConditionalFormatPercentColumn,
    PercentColumn,
    Precision2Column,
    Precision8Column,
    AssetsModal,
    ColumnRemoveAsset
  },
  extends: StoreSync(),
  props: {
    rows: {
      type: Array,
      required: true
    },
    areAllocationsEditable: {
      type: Boolean,
      required: true
    },
    targetAllocations: {
      type: Array,
      required: false,
      default: () => []
    },
    possibleAllocations: {
      type: Array,
      required: false,
      default: () => undefined
    },
    showPercentOffGoal: {
      type: Boolean,
      required: false,
      default: () => false
    },
    totalFiat: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      isFiat: false,
      editingAllocations: false,
      newPercents: {},
      lockedAssets: [],
      showAssetsModal: false,
      addedAssets: [],
      removedAssets: []
    }
  },
  computed: {
    emptyTargets() {
      const keys = this.rows.map(r => r.asset)

      return this.targetAllocations
        .concat(this.addedAssets)
        .filter(ta => !keys.includes(ta.name)) // Remove assets in balances
        .filter(ta => !this.removedAssets.includes(ta.name)) // Removed deleted assets
        .map(ta => ({
          asset: ta.name,
          btcDayChange: 0,
          btcHourChange: 0,
          btcRate: 0,
          btcValue: 0,
          btcWeekChange: 0,
          fiatRate: 0,
          fiatValue: 0,
          offByPercent: -ta.y,
          portfolioPercent: 0,
          targetPercent: ta.y,
          total: 0
        }))
    },
    allRows() {
      return this.rows.concat(this.emptyTargets)
    },
    unselectedAssets() {
      return (
        this.possibleAllocations &&
        this.possibleAllocations.filter(
          a => !this.allRows.map(r => r.asset).includes(a)
        )
      )
    },
    columns() {
      const columns = [
        {
          label: 'Asset',
          component: AssetColumn,
          representedAs: row => row.asset,
          align: 'right',
          sortable: true
        },
        {
          label: 'Total',
          component: Precision8Column,
          representedAs: row => row.total,
          align: 'right',
          sortable: true
        },
        {
          label: this.isFiat ? 'Fiat Rate' : 'BTC Rate',
          component: this.isFiat ? Precision2Column : Precision8Column,
          representedAs: row => (this.isFiat ? row.fiatRate : row.btcRate),
          align: 'right',
          sortable: true
        },
        {
          label: this.isFiat ? 'Fiat Value' : 'BTC Value',
          component: this.isFiat ? Precision2Column : Precision8Column,
          representedAs: row => (this.isFiat ? row.fiatValue : row.btcValue),
          align: 'right',
          sortable: true
        }
      ]

      if (this.editingAllocations) {
        return columns.concat([
          {
            label: 'Target Percent',
            component: PercentSliderColumn,
            representedAs: row => ({
              locked: this.isLocked(row.asset),
              percent: this.newPercents[row.asset],
              onChange: percent => this.handlePercentChange(row.asset, percent),
              toggleLock: () => this.toggleLock(row.asset)
            }),
            align: 'center',
            sortable: true
          },
          {
            label: 'Remove',
            component: ColumnRemoveAsset,
            representedAs: row => ({
              disabled:
                this.isLocked(row.asset) ||
                this.allRows.length - this.lockedAssets.length === 1, // At least one other mdb-row has to be enabled to take the percent
              deleteAsset: () => {
                this.handlePercentChange(row.asset, 0)
                this.removeAsset(row.asset)
              }
            }),
            align: 'center',
            sortable: false
          }
        ])
      }

      const extendedColumns = [
        ...columns,
        {
          label: 'Hour %',
          component: ConditionalFormatPercentColumn,
          representedAs: row => row.btcHourChange,
          align: 'right',
          sortable: true
        },
        {
          label: 'Day %',
          component: ConditionalFormatPercentColumn,
          representedAs: row => row.btcDayChange,
          align: 'right',
          sortable: true
        },
        {
          label: 'Week %',
          component: ConditionalFormatPercentColumn,
          representedAs: row => row.btcWeekChange,
          align: 'right',
          sortable: true
        }
      ]

      if (this.showPercentOffGoal) {
        return extendedColumns.concat({
          label: 'Percent off Goal',
          component: ConditionalFormatPercentColumn,
          representedAs: row => row.offByPercent * 100,
          align: 'right',
          sortable: true
        },
        {
          label: 'Percent of Portfolio',
          component: PercentColumn,
          representedAs: row => row.portfolioPercent * 100,
          align: 'right',
          sortable: true
        })
      } else {
        return columns.concat({
          label: 'Percent of Portfolio',
          component: PercentColumn,
          representedAs: row => row.portfolioPercent * 100,
          align: 'right',
          sortable: true
        })
      }

      return extendedColumns
    }
  },
  methods: {
    originalPercents() {
      return Object.assign(
        // Map name to value
        ...this.allRows.map(v => ({ [v.asset]: v.targetPercent }))
      )
    },
    handlePercentChange(asset, percent) {
      const unlockedSum = Object.keys(this.newPercents)
        .filter(a => !this.isLocked(a))
        .reduce((agg, a) => agg + this.newPercents[a], 0)
      this.newPercents[asset] = Math.min(percent, unlockedSum)
      this.toggleLock(asset)
      this.newPercents = { ...this.balancePercents() }
      this.toggleLock(asset)
      const sum = Object.values(this.newPercents).reduce((t, p) => t + p, 0)
      if (sum < 100) {
        this.newPercents[asset] += 100 - sum
      }
    },
    startEdit() {
      this.editingAllocations = true
      // TODO: figure out if we should use:
      // await api.cube.targetAllocations(this.$route.params.cubeID);
      this.newPercents = { ...this.originalPercents() }
      this.newPercents = { ...this.balancePercents() }
    },
    cancelEdit() {
      this.editingAllocations = false
      this.addedAssets = []
      this.removedAssets = []
    },
    async savePercents() {
      const newAllocations = Object.keys(this.newPercents).map(key => ({
        name: key,
        y: this.newPercents[key]
      }))
      let a = {}
      // eslint-disable-next-line
      for (a of newAllocations) {
        const value = Math.round(a.y * this.totalFiat) / 100
        if (a.y !== 0 && value < 50) {
          this.$toasted.error(
            `${a.name} has a fiat value of ${value}. The minimum is 50. Either increase the percentage allocation or remove the asset from your portfolio.`
          )
          return
        }
      }
      this.cancelEdit()
      this.showSpinner()
      await api.cube.updateTargetAllocations({
        cube_id: this.$route.params.cubeID,
        new_allocations: newAllocations
      })
      this.hideSpinner()
      this.clearCacheWithSpinner(
        Models.CUBE_BALANCES(this.$route.params.cubeID)
      )
      this.clearCacheWithSpinner(
        Models.CUBE_ALLOCATIONS_TARGET(this.$route.params.cubeID)
      )
    },
    isLocked(asset) {
      return this.lockedAssets.includes(asset)
    },
    toggleLock(asset) {
      if (this.isLocked(asset)) {
        this.lockedAssets = this.lockedAssets.filter(a => asset !== a)
      } else {
        this.lockedAssets.push(asset)
      }
    },
    balancePercents() {
      const percents = { ...this.newPercents }
      const count = Object.keys(percents).length
      const sum = Object.values(percents).reduce((agg, p) => agg + p, 0)
      if (count === 0) {
        return {}
      }
      const unlocked = Object.keys(percents).filter(
        asset => !this.isLocked(asset)
      )
      const unlockedCount = unlocked.length
      const unlockedSum = unlocked.reduce((agg, a) => agg + percents[a], 0)
      const lockedSum = sum - unlockedSum
      // Set sum to 100 if it is less than 100
      if (sum !== 100) {
        unlocked.forEach(key => {
          if (unlockedSum === 0) {
            // Spread it evenly across all percents if unlockedSum is 0
            percents[key] = (100 - sum) / unlockedCount
          } else {
            // Multiply all percents to 100
            percents[key] = (percents[key] / unlockedSum) * (100 - lockedSum)
          }
        })
      }
      Object.keys(percents).forEach(key => {
        percents[key] = Math.round(percents[key] * 10) / 10
      })
      return percents
    },
    addAsset(asset) {
      this.showAssetsModal = false
      if (this.removedAssets.includes(asset)) {
        this.removedAssets = this.removedAssets.filter(a => asset !== a)
      } else {
        this.addedAssets.push({ name: asset, y: 0 })
      }
      this.newPercents[asset] = 0
    },
    removeAsset(asset) {
      this.lockedAssets = this.lockedAssets.filter(a => asset !== a)
      if (this.addedAssets.find(a => a.name === asset)) {
        this.addedAssets = this.addedAssets.filter(a => a.name !== asset)
      } else {
        this.removedAssets.push(asset)
      }
      delete this.newPercents[asset]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.table-wrapper {
  width: 100%;
  margin-bottom: 40px;
  margin-top: 40px;
  overflow-x: auto;
}

.table-striped {
  color: #000;
  // background-color: $coincube-dark;
}

.table-wrapper /deep/ thead th span {
  @media (max-width: 992px) {
    font-size: 0.8em;
  }
}

h4 {
  font-weight: 300;
}
.right {
  float: right;
}
.switch {
  float: left;
  padding-top: 6px;
}
i.sort.fas {
  padding-left: 3px;
}
</style>
