<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'MapFrequencyColumn',
  props: {
    column: {
      type: [Object, Array],
      required: true,
    },
    row: {
      type: [Object, Array],
      required: true,
    },
  },
  data() {
    return {
      frequencies: {
        3600: 'Hourly',
        86400: 'Daily',
        604800: 'Weekly',
        2412900: 'Monthly',
      },
    };
  },
  computed: {
    text() {
      return this.frequencies[this.column.getRepresentation(this.row)];
    },
  },
};
</script>
