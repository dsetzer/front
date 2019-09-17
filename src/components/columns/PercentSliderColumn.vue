<template>
  <div class="container">
    <span class="glyph">
      <i :class="{'fa-lock': locked, 'fa-unlock': !locked}" class="fa" @click="toggleLock" />
    </span>
    <input :min="0" :max="100" :disabled="locked" v-model="percent" type="range" class="ml-3 input" />
    <span class="ml-3 percent">
      <input :disabled="locked" v-model.lazy="formattedPercent" class="faux-md-input" />
    </span>
  </div>
</template>

<script>
import formatValue from '@/utils/formatValue'
import precisionRound from '@/utils/precisionRound'

export default {
  name: 'PercentColumn',
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
    toggleLock() {
      return this.column.getRepresentation(this.row).toggleLock
    },
    onChange() {
      return this.column.getRepresentation(this.row).onChange
    },
    locked() {
      return this.column.getRepresentation(this.row).locked
    },
    percent: {
      get() {
        return this.column.getRepresentation(this.row).percent
      },
      set(value) {
        this.onChange(parseFloat(value))
      }
    },
    formattedPercent: {
      get() {
        const rounded = precisionRound(this.percent, 1)
        const padded = formatValue(rounded, 1)
        return `${padded}%`
      },
      set(value) {
        this.onChange(parseFloat(value))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
}
.input {
  flex-grow: 1;
}
.glyph {
  width: 30px;
}
.fa {
  cursor: pointer;
}
.fa-unlock {
  color: $coincube-green;
}
.fa-lock {
  color: $coincube-red;
}
.percent {
  width: 80px;
}
</style>
