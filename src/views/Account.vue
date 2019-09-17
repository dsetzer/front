<template>
  <mdb-container fluid>
    <mdb-row v-if="showWelcome" class="welcome">
      <mdb-col md="12">
        <h2 class="title">Welcome to Coincube!</h2>
        <h6>Please select the big button below to set up an exchange connection.</h6>
      </mdb-col>

      <div class="center">
        <cube-select />
      </div>
    </mdb-row>

    <mdb-row v-else>
      <mdb-col class="top" sm="12">
        <div>
          <mdb-card>
            <mdb-view cascade>
              <img class="icon" src="../assets/img/DASHBOARD.png" />
              <div class="header-text">
                <span>Dashboard</span>
              </div>
            </mdb-view>
            <mdb-card-body>
              <template v-if="showBalances">
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
      <mdb-col sm="12">
        <div>
          <mdb-card>
            <mdb-view cascade>
              <img class="icon" src="../assets/img/PORTFOLIO.png" />
              <div class="header-text">
                <span>Portfolio</span>
              </div>
            </mdb-view>
            <mdb-card-body>
              <template v-if="showBalances">
                <mdb-row class="text-center">
                  <balances-table
                    :are-allocations-editable="false"
                    :rows="balances"
                    :btc-performance-in-fiat="balancesAndAllocations.performance_fiat"
                  />
                </mdb-row>
              </template>
              <div class="black-divider" />
              <template v-if="showAllocations">
                <br />
                <mdb-row class="text-center">
                  <mdb-col :md="valuationsChartColSpan">
                    <allocation-donut-pie-chart
                      v-if="showAllocations"
                      :data="allocations"
                      title="Allocations"
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
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody,
  mdbView
} from 'mdbvue'
import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import mapAllBalancesData from '@/utils/mapAllBalancesData'
import AllocationDonutPieChart from '@/components/charts/AllocationDonutPieChart'
import BalancesTable from '@/components/tables/BalancesTable'
import Valuations from '@/components/Valuations'
import CubeSelect from '@/components/CubeSelect'

export default {
  name: 'Account',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbView,
    AllocationDonutPieChart,
    BalancesTable,
    Valuations,
    CubeSelect
  },
  extends: StoreSync({
    user: () => Models.USER(),
    balancesAndAllocations: () => Models.ACCOUNT_BALANCES_AND_ALLOCATIONS()
  }),
  computed: {
    //
    // Chart mdbCol Spans
    //
    allocationsChartColSpan() {
      return this.showValuations ? '6' : '12'
    },
    valuationsChartColSpan() {
      return '12'
    },
    //
    // Flags
    //
    showAllocations() {
      return this.allocations && this.allocations.length > 0
    },
    showBalances() {
      return this.balances && this.balances.length > 0
    },
    showFiatOnly() {
      return !this.user.btc_data
    },
    showWelcome() {
      return !this.user.open_cubes || this.user.open_cubes.length === 0
    },
    //
    // Lists
    //
    allocations() {
      return this.balancesAndAllocations.allocations
    },
    balances() {
      return this.balancesAndAllocations.balances &&
        this.balancesAndAllocations.balances.values
        ? mapAllBalancesData(this.balancesAndAllocations.balances.values)
        : null
    },
    //
    // Single Values
    //
    bitcoinCurrentBalance() {
      return this.balancesAndAllocations.total.btc
    },
    fiatCurrentBalance() {
      return this.balancesAndAllocations.total.fiat
    },
    fiatSymbol() {
      return this.user.fiat.symbol
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.black-divider {
  width: 100%;
  height: 1px;
  margin-top: 14px;
  background-color: #000000;
}
.welcome {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.center {
  padding-top: 20px;
  margin: auto;
}
.mdb-card-body img {
  width: 20px;
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
</style>
