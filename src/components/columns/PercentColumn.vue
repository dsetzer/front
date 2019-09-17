<template>
  <span class="percent">{{ content | formatPercent }}</span>
</template>

<script>
import formatValue from '@/utils/formatValue'
import precisionRound from '@/utils/precisionRound'

export default {
  name: 'PercentColumn',
  filters: {
    formatPercent(value) {
      const rounded = precisionRound(value, 2)
      const padded = formatValue(rounded, 2)
      return `${padded}%`
    }
  },
  props: {
    column: {
      type: [Object, Array],
      required: true
    },
    row: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    content() {
      return this.column.getRepresentation(this.row)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.percent:hover i {
  visibility: visible;
}
.percent {
  color: $coincube-dark;
}
</style>
