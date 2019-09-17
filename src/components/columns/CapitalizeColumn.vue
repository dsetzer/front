<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'CapitalizeColumn',
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
  computed: {
    text() {
      return this.capitalizeFirstLetter(
        this.column.getRepresentation(this.row),
      );
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>
