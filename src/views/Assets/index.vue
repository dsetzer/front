<template>
  <div class="main-content">
    <spinner v-if="isLoading" />
    <mdb-container fluid>
      <div class="border-bottom border-dark">
        <mdb-row class="text-center">
          <h1>Supported Exchanges and Assets</h1>
        </mdb-row>
        <mdb-row>
          <mdb-col>
            <mdb-tab classic-tabs color="darker" class="d-flex justify-content-center">
              <mdb-tab-item
                v-for="exchange in supported_exchanges"
                :key="exchange.id"
                :active="tab == exchange.id"
                class="tab-trigger nw-account-portfolio text-sm"
                @click.native.prevent="handleTabChange(exchange)"
              >{{ exchange.name }}</mdb-tab-item>
            </mdb-tab>
          </mdb-col>
        </mdb-row>
      </div>
    </mdb-container>
    <div>
      <mdb-tab-content>
        <div name="slide-toggle">
          <mdb-tab-pane
            v-for="exchange in supported_exchanges"
            v-show="tab==exchange.id"
            :key="exchange.id"
          >
            <mdb-row>
              <mdb-col lg="1" />
              <mdb-col class="cards" lg="10">
                <mdb-card v-for="asset in exchange.assets" :key="asset.id" class="card" testimonial>
                  <mdb-card-body>
                    <mdb-card-title>
                      <img :src="`/static/img/icons/${asset.symbol}.png`" class="rounded-circle" />
                      {{ asset.symbol }}
                    </mdb-card-title>
                    <hr />
                    <p>{{ asset.name }}</p>
                  </mdb-card-body>
                </mdb-card>
              </mdb-col>
              <mdb-col lg="1" />
            </mdb-row>
          </mdb-tab-pane>
        </div>
      </mdb-tab-content>
    </div>
  </div>
</template>

<script>
import {
  mdbContainer,
  mdbTab,
  mdbTabItem,
  mdbTabContent,
  mdbTabPane,
  mdbRow,
  mdbCol,
  mdbBtn,
  mdbCard,
  mdbCardBody,
  mdbCardTitle
} from 'mdbvue'
import api from '@/utils/api'
import Spinner from '@/components/Spinner'

export default {
  name: 'Assets',
  components: {
    mdbContainer,
    mdbTab,
    mdbTabItem,
    mdbTabContent,
    mdbTabPane,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    Spinner
  },
  data() {
    return {
      isLoading: true,
      tab: 2,
      supported_exchanges: []
    }
  },
  async beforeMount() {
    try {
      // Get data from API
      const { data } = await api.supported_exchange_assets.getAll()
      this.supported_exchanges = data
      this.isLoading = false
    } catch (err) {
      // Could not get data from API, then throw an error
      throw new Error('Could not get data from API.')
    }
  },
  methods: {
    handleTabChange(exchange) {
      this.tab = exchange.id
    },
    formatNumber(number) {
      if (number !== null) {
        return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
      return 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.main-content {
  padding-top: 1rem;
  padding-bottom: 1rem;
  min-height: calc(100vh - 100px);

  @media (min-width: 768px) {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
}
.border-bottom {
  border-bottom-width: 3px !important;
}
.border-dark {
  border-color: $coincube-darker;
}
.card {
  background: $coincube-darker;
  width: 190px;
  height: 130px;
  margin: 12px;
  float: left;
}
img {
  width: 20px;
  margin-right: 10px;
  margin-top: -4px;
}
hr {
  background-color: white;
}
</style>
