<template>
  <mdb-container>
    <mdb-row class="text-left">
      <mdb-col sm="6">
        <h1 class="h1-responsive">
          {{ formatValue(val_fiat, 2) }}
          <span>{{ user.fiat.symbol }}</span>
        </h1>
        <h4 class="h4-responsive">
          TOTAL FIAT VALUE
          <mdb-tooltip :options="{placement: 'right'}" trigger="hover">
            <div
              class="tooltip"
            >Total values are updated once every 10 minutes and may not exactly match your exchange total.</div>
            <i slot="reference" class="fa fa-question-circle info" />
          </mdb-tooltip>
        </h4>
      </mdb-col>
      <mdb-col v-if="user.btc_data" sm="6">
        <h1 class="h1-responsive">
          {{ formatValue(val_btc, 6) }}
          <span>BTC</span>
        </h1>
        <h4 class="h4-responsive">TOTAL BITCOIN VALUE</h4>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbTooltip } from 'mdbvue'
import formatValue from '@/utils/formatValue'

export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbTooltip
  },
  props: {
    val_fiat: {
      type: Number,
      required: true
    },
    val_btc: {
      type: Number,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatValue
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

h1 {
  font-size: 34px;
  color: #000;
  margin-top: 20px;
}

span {
  font-size: 16px;
  font-weight: 400;
  color: #000;
}

h4 {
  font-size: 14px;
  color: #000;
}
</style>
