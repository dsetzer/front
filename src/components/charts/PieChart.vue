<template>
  <pie-chart :data="chartData" :donut="true" :legend="false" suffix="%"></pie-chart>
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      const array = []
      this.series.forEach(alloc => {
        var percent = alloc.y * 100
        percent = percent.toFixed(2)
        array.push([alloc.name, percent])
      })
      return array
    }
  }
}
</script>

<style lang="scss" scoped>
canvas {
  height: 300px;
}
</style>
