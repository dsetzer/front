<template>
  <mdb-container class="pt-4">
    <mdb-row class="justify-content-center">
      <mdb-col lg="6">
        <div class="d-flex align-items-center justify-content-between">
          <p class="h5-responsive">Fiat Currency</p>
          <app-select
            v-model="selectedFiat"
            :options="fiatOptionsList"
            placeholder="Select Fiat"
            name="fiat-select"
          />
        </div>
         <div class="d-flex align-items-center justify-content-between pt-4">
          <p class="h5-responsive small-md">
            Display Bitcoin Data
          </p>
          <div>
            <toggle-button
              :value="user.btc_data"
              :labels="{checked: 'On', unchecked: 'Off'}"
              @input="handleBtcChange"
            />
          </div>
        </div>
        <div class="d-flex pt-4">
          <mdb-btn block color="primary" class="button" @click.native="resetUser">Reset Account</mdb-btn>
        </div>
        <div class="d-flex pt-4">
          <mdb-btn
            block
            color="danger"
            class="button nw-account-delete-account"
            @click.native="deleteUser"
          >Delete Account</mdb-btn>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn } from 'mdbvue'

import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import AppSelect from '@/components/AppSelect'
import api from '@/utils/api'

export default {
  name: 'SettingsPortfolio',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    AppSelect
  },
  extends: StoreSync({
    user: () => Models.USER()
  }),
  data() {
    return {
      fiatOptions: [[7, 'USDT'], [26, 'USDC'], [37, 'TUSD'], [344, 'GUSD'], [501, 'USD'], [502, 'EUR'], [503, 'GBP']]
    }
  },
  computed: {
    fiatId() {
      return this.fiatOptions[this.user.fiat.symbol]
    },
    fiatOptionsList() {
      return this.fiatOptions.map(fiatOptions => ({
        label: fiatOptions[1],
        value: fiatOptions[0]
      }))
    },
    selectedFiat: {
      get() {
        return this.user.fiat_id
      },
      set(value) {
        this.handleFiatChange(value)
      }
    }
  },
  methods: {
    async saveChange({ name, value }) {
      await api.account.saveSetting({
        name: name.toString(),
        value: value.toString()
      })
      this.clearCache(Models.USER())
    },
    async handleFiatChange(value) {
      this.user.fiat_id = value
      await this.saveChange({ name: 'fiat_id', value })
      this.user.open_cubes.map(cube =>
        this.clearCache(Models.CUBE_BALANCES(cube.id))
      )
      this.clearCache(Models.ACCOUNT_BALANCES_AND_ALLOCATIONS())
      this.clearCache(Models.ACCOUNT_VALUATIONS())
    },
    handleBtcChange(value) {
      this.user.btc_data = value
      this.saveChange({ name: 'btc_data', value: value.toString() })
    },
    deleteUser() {
      this.$toasted.info('Deleting Account...')
      this.saveChange({
        name: 'delete',
        value: ''
      })

      this.$auth.signOut()

      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

select {
  display: block !important;

  @media (max-width: 992px) {
    background: #000;
    margin-top: -0.8em;
  }
}

.switch-accent {
  @media (max-width: 992px) {
    font-size: 0.8em;
    text-align: center;
  }
}

.switch-accent /deep/ label input[type='checkbox']:checked + .lever {
  background-color: $coincube-green !important;
}

.switch-accent /deep/ label input[type='checkbox']:checked + .lever:after {
  background-color: $coincube-accent !important;
}

.mdb-btn {
  font-weight: 700;
}

.small-md {
  @media (max-width: 992px) {
    font-size: 1.3em;
  }
}
</style>
