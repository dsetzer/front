<template>
  <div class="assets-table-wrapper">
    <spinner v-if="isLoading" />
    <mdb-datatable v-else :data="data">
      <template slot-scope="{ row }">
        <tr>
          <td>
            <img :src="`/static/img/icons/${row.icon}.png`" class="table-icon" />
            <a
              :href="`https://coinmarketcap.com/currencies/${row.name}`"
              target="_blank"
            >{{ row.icon }}</a>
          </td>
          <td>
            <div :class="`table-asset-${row.binance}`" />
          </td>
          <td>
            <div :class="`table-asset-${row.bitfinex}`" />
          </td>
          <td>
            <div :class="`table-asset-${row.bittrex}`" />
          </td>
          <td>
            <div :class="`table-asset-${row.external}`" />
          </td>
          <td>
            <div :class="`table-asset-${row.bitfinex}`" />
          </td>
          <td>
            <div :class="`table-asset-${row.gdax}`" />
          </td>
          <td>
            <div :class="`table-asset-${row.gemini}`" />
          </td>
          <td>
            <div :class="`table-asset-${row.hitbtc}`" />
          </td>
          <td>
            <div :class="`table-asset-${row.kraken}`" />
          </td>
          <td>
            <div :class="`table-asset-${row.poloniex}`" />
          </td>
        </tr>
      </template>
    </mdb-datatable>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import api from '@/utils/api'
import mdbDatatable from 'mdbvue'

export default {
  name: 'AssetsTable',
  components: { Spinner, mdbDatatable },
  data() {
    return {
      isLoading: true,
      columns: [],
      rows: [],
      data: {}
    }
  },
  async beforeMount() {
    try {
      // Get data from API
      const { data } = await api.supported_assets.getAll()

      // Format headers so vue-datatables can consume it
      const headers = this.formDatatableHeaders(data[0].header)
      const rows = this.formatDatatableRows(data[0].values)

      // Set formatted headers to local state
      this.rows = rows
      this.columns = headers
      this.data['columns'] = headers
      this.data['rows'] = rows

      this.isLoading = false
    } catch (err) {
      // Could not get data from API, then throw an error
      throw new Error('Could not get data from API.')
    }
  },
  methods: {
    formDatatableHeaders(arr) {
      // We want the first column to be empty
      const firstColumn = [
        {
          label: '',
          field: 'icon',
          align: 'center'
        }
      ]

      // We generate an array that vue-datatables can consume as headers
      const headers = arr.map(value => ({
        label: value,
        field: value,
        align: 'center',
        sortable: false
      }))

      // We append the first column into the result
      // (We use concat to avoid data mutation, yay!)
      return [].concat(firstColumn, headers)
    },
    formatDatatableRows(arr) {
      return arr.map(value => ({
        name: value[0],
        icon: value[1],
        binance: value[2],
        bitfinex: value[3],
        bitsamp: value[4],
        bittrex: value[5],
        external: value[6],
        gdax: value[7],
        gemini: value[8],
        hitbtc: value[9],
        kraken: value[10],
        poloniex: value[11]
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'build/variables';

.assets-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table.table {
  a {
    color: $light;
  }

  tbody tr:nth-child(odd) {
    background-color: $coincube-contrast;
    border-top: 2px solid $coincube-contrast;
    border-bottom: 2px solid $coincube-contrast;
  }

  thead th span {
    margin-right: 0.5rem;
  }

  .table-icon {
    max-width: 20px;
    margin-right: 0.5rem;
  }
}

.table-asset-yes {
  margin: 2px auto;
  width: 18px;
  height: 18px;
  background-color: $coincube-accent;
  border-radius: 50%;
}

.table-asset-no {
  margin: 8px auto;
  width: 12px;
  height: 12px;
  background-color: $coincube-red;
  border-radius: 50%;
}
</style>
