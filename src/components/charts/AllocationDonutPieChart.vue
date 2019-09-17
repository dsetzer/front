<template>
  <mdb-container>
    <br />
    <h4>{{ title }}</h4>
    <br />
    <pie-chart :data="chartData" :donut="true" suffix="%" legend="bottom"></pie-chart>
  </mdb-container>
</template>

<script>
import { mdbContainer } from 'mdbvue'
export default {
  name: 'AllocationDonutPieChart',
  components: {
    mdbContainer
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Allocations'
    }
  },
  computed: {
    chartData() {
      const array = []
      this.data.forEach(alloc => {
        var percent = alloc.y * 100
        percent = percent.toFixed(2)
        array.push([alloc.name, percent])
      })
      return array
    }
  }
}
</script>
