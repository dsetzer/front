<template>
  <div class="table-wrapper">
    <h4>Open Orders</h4>
    <datatable :columns="columns" :data="rows" />
    <datatable-pager v-model="page" :per-page="perPage" type="long" />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'OpenOrdersTable',
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
          label: 'Created At',
          representedAs: row => moment(row.timestamp * 1000).format('LLL'),
          align: 'center',
          sortable: true
        },
        {
          label: 'Order ID',
          representedAs: row => row.order_id,
          align: 'center',
          sortable: true
        },
        {
          label: 'Amount',
          representedAs: row => row.amount,
          align: 'center',
          sortable: true
        },
        {
          label: 'Side',
          representedAs: row =>
            row.side.charAt(0).toUpperCase() + row.side.slice(1),
          align: 'center',
          sortable: true
        },
        {
          label: 'Price',
          representedAs: row => row.price,
          align: 'center',
          sortable: true
        },
        {
          label: 'Filled',
          representedAs: row => row.filled,
          align: 'center',
          sortable: true
        },
        {
          label: 'Base',
          representedAs: row => row.ex_pair.base_symbol,
          align: 'center',
          sortable: true
        },
        {
          label: 'Quote',
          representedAs: row => row.ex_pair.quote_symbol,
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
}

h4 {
  font-weight: 300;
}
</style>
