<template>
  <div class="app-select">
    <!-- <h4>{{ value }}</h4>
    <multiselect
      value="value"
      track-by="label"
      label="label"
      placeholder="placeholder"
      :options="options"
      :searchable="false"
      :allow-empty="false"
    ></multiselect>-->
    <select :value="value" v-bind="$attrs" v-on="listeners" @input="handleInput">
      <option :value="0" disabled selected>{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        <slot :option="option">{{ option.label }}</slot>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: null,
      default: 'Select'
    },
    placeholder: {
      type: String,
      default: () => 'Select Value'
    }
  },
  computed: {
    listeners() {
      const { input, ...listeners } = this.$listeners
      return listeners
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
</style>
