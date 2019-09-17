<template>
  <div
    :class="{selected: selected}"
    class="select-index-container"
    @click="onClick(chart.index_type, chart.chart)"
  >
    <h6>{{ title }}</h6>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    selected: {
      type: Boolean,
      default: false
    },
    chart: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.select-index-container {
  background-color: $coincube-white;
  border: 3px solid $coincube-white;
  text-align: center;
  width: 140px;
  height: 30px;
  cursor: pointer;
  margin: 10px;
  padding: 3px;

  &.notAllowed:hover {
    border: 3px solid $coincube-red;
  }

  &:hover,
  &.selected {
    border: 3px solid $coincube-accent;
  }
}
.selected-index-container h6 {
  margin-bottom: 0px;
  padding-bottom: 0px;
}
h6 {
  z-index: 1000;
}
</style>
