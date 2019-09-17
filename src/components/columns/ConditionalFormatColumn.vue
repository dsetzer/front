<template>
  <span
    :class="{ 'negative-format': isNegative, 'positive-format': isPositive, 'zero-format': isZero }"
  >{{ value }}</span>
</template>

<script>
export default {
  name: 'ConditionalFormatColumn',
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
      return this.value < 0
    },
    isPositive() {
      return this.value > 0
    },
    isZero() {
      return this.value === 0
    },
    value() {
      return this.column.getRepresentation(this.row)
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
