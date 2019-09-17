<template>
  <mdb-container fluid class="connections">
    <div class="exchange-connections">
      <InstructionHeader
        :instruction-modal="handleToggleInstructionsModal"
        title="Add Cube Connection"
      />
      <mdb-row class="exchange-cards-list">
        <mdb-col v-for="exchange in availableExchanges" :key="`${exchange.name}`">
          <exchange-card
            :exchange="exchange"
            :title="exchange.name"
            :content-location="`${exchange.name}.png`"
          />
        </mdb-col>
      </mdb-row>

      <instructions-modal
        :show-modal="showInstructionsModal"
        :toggle-modal="handleToggleInstructionsModal"
        :modal-content="instructions"
      />
    </div>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from 'mdbvue'
import InstructionsModal from '@/components/modals/InstructionsModal'
import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import ExchangeCard from './ExchangeCard'
import InstructionHeader from '@/components/InstructionHeader'
import api from '@/utils/api'

export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    ExchangeCard,
    InstructionsModal,
    InstructionHeader
  },
  extends: StoreSync({
    availableExchanges: () => Models.ACCOUNT_AVAIL_EXCHANGES()
  }),
  data() {
    return {
      showInstructionsModal: false,
      showAssetsModal: false,
      instructions: {}
    }
  },
  mounted() {
    this.getInstructions()
  },
  methods: {
    handleToggleInstructionsModal() {
      this.showInstructionsModal = !this.showInstructionsModal
    },
    handleToggleAssetsModal() {
      this.showAssetsModal = !this.showAssetsModal
    },
    async getInstructions() {
      const { data } = await api.instructions.connection()

      this.instructions = data
    }
  }
}
</script>

<style lang="scss" scoped>
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
    display: inline;
  }

  @media (min-width: 768px) {
    padding-top: 0.5em;
    margin-bottom: initial;
    text-align: left;
  }
}

.exchange-buttons {
  text-align: center;
  button {
    width: 290px;
    margin: 0.37rem 0;

    @media (min-width: 768px) {
      width: initial;
      margin: 0.37rem;
    }
  }

  @media (min-width: 768px) {
    text-align: right;
  }
}

.exchange-cards-list {
  margin-bottom: 1em;
  text-align: center;
}
</style>
