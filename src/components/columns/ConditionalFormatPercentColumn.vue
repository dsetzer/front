<template>
  <span
    :class="{ 'negative-format': isNegative, 'positive-format': isPositive, 'zero-format': isZero }"
  >{{ formattedValue }}</span>
</template>

<script>
import formatValue from '@/utils/formatValue'
import precisionRound from '@/utils/precisionRound'

export default {
  name: 'ConditionalFormatPercentColumn',
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
    isNegative() {
      return this.roundedValue < 0
    },
    isPositive() {
      return this.roundedValue > 0
    },
    isZero() {
      return this.roundedValue === 0
    },
    roundedValue() {
      const value = this.column.getRepresentation(this.row)
      return precisionRound(value, 2)
    },
    formattedValue() {
      return `${formatValue(this.roundedValue, 2)}%`
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.negative-format {
  color: $coincube-red;
}
.positive-format {
  color: $coincube-green;
}
.zero-format {
  color: $coincube-dark;
}
</style>
