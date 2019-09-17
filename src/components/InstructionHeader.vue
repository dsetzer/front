<template>
  <mdb-row class="instruction-component">
    <mdb-col md="6">
      <div class="title-container">
        <div class="color-divider" />
        <h5 class="title">{{ title }}</h5>
      </div>
    </mdb-col>
    <mdb-col class="buttons" md="6">
      <mdb-btn
        v-if="instructionModal"
        size="sm"
        outline="info"
        @click.native.prevent="instructionModal"
      >INSTRUCTIONS</mdb-btn>
      <mdb-btn
        v-if="actionModal"
        size="sm"
        color="primary"
        @click.native.prevent="actionModal"
      >{{ actionButtonText }}</mdb-btn>
    </mdb-col>
  </mdb-row>
</template>

<script>
import { mdbRow, mdbCol, mdbBtn } from 'mdbvue'

export default {
  components: {
    mdbRow,
    mdbCol,
    mdbBtn
  },
  props: {
    actionButtonText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Title'
    },
    instructionModal: {
      type: Function,
      required: false,
      default: null
    },
    actionModal: {
      type: Function,
      required: false,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.instruction-component {
  margin-top: 20px;
  margin-bottom: 20px;
}

.color-divider {
  height: 2px;
  width: 40px;
  background-color: #3154d6;
  display: inline-block;
  margin-bottom: 0.3em;
  margin-right: 1.5em;
}

.title-container {
  padding-top: 1em;
  text-align: center;
  margin-bottom: 0.5em;

  .title {
    font-weight: 300;
    display: inline;
  }

  @media (min-width: 768px) {
    padding-top: 0.5em;
    margin-bottom: initial;
    text-align: left;
  }
}

.buttons {
  text-align: center;
  button {
    padding: 0.8em 2em;
    margin: 0.37rem 0;
    display: inline-block;

    @media (min-width: 768px) {
      width: initial;
      margin: 0.37rem;
    }
  }

  @media (min-width: 768px) {
    text-align: right;
  }
}
</style>
