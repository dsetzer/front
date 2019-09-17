<template>
  <div
    :class="{selected: selected, notAllowed: !allowed}"
    class="select-square-container"
    @click="onClick(title, allowed)"
  >
    <img class="icon" src="../assets/img/TRADE.png" />
  </div>
</template>

<script>
export default {
  props: {
    allowed: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: null
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.select-square-container {
  background-color: $coincube-white;
  border: 3px solid $coincube-purple;
  text-align: center;
  width: 224px;
  height: 224px;
  margin: auto;
  cursor: pointer;

  &.notAllowed:hover {
    border: 3px solid $coincube-red;
  }

  &:hover,
  &.selected {
    border: 3px solid $coincube-accent;
  }
}

.icon {
  margin-left: 28px;
  margin-top: 28px;
  max-width: 160px;
  display: table-cell;
  float: left;
}
</style>
