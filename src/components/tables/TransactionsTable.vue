<template>
  <div id="table" class="table-wrapper">
    <h4>Transactions</h4>
    <datatable :columns="columns" :data="rows" />
    <datatable-pager v-model="page" :per-page="perPage" type="long" />
  </div>
</template>

<script>
import moment from 'moment'
import ConditionalFormatColumn from '../columns/ConditionalFormatColumn'

export default {
  name: 'TransactionsTable',
  components: {
    ConditionalFormatColumn
  },
  props: {
    rows: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      columns: [
        {
          label: 'Date',
          representedAs: row => moment(row.datetime).format('LLL'),
          align: 'center',
          sortable: true
        },
        {
          label: 'Type',
          representedAs: row =>
            row.type.charAt(0).toUpperCase() + row.type.slice(1),
          align: 'center',
          sortable: true
        },
        {
          label: 'Base',
          representedAs: row => row.base_symbol,
          align: 'center',
          sortable: true
        },
        {
          label: 'Base Amount',
          component: ConditionalFormatColumn,
          representedAs: row => row.base_amount,
          align: 'center',
          sortable: true
        },
        {
          label: 'Quote',
          representedAs: row => row.quote_symbol,
          align: 'center',
          sortable: true
        },
        {
          label: 'Quote Amount',
          component: ConditionalFormatColumn,
          representedAs: row => row.quote_amount,
          align: 'center',
          sortable: true
        },
        {
          label: 'Price',
          representedAs: row => row.price,
          align: 'center',
          sortable: true
        }
      ],
      page: 1,
      perPage: 20
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

h4 {
  font-weight: 300;
}
</style>
