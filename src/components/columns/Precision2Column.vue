<template>
  <span class="precision">{{ content | formatPercent }}</span>
</template>

<script>
import formatValue from '@/utils/formatValue'

export default {
  name: 'Precision2Column',
  filters: {
    formatPercent(value) {
      return formatValue(value, 2)
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

.precision {
  color: $coincube-text;
}
</style>
