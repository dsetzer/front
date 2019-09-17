<template>
  <mdb-container class="pt-4 settings-two-factor">
    <mdb-row class="justify-content-center">
      <mdb-col v-if="isSecondFactorEnabled" lg="6">
        <mdb-row class="justify-content-center mt-5">
          <mdb-col col="10">
            <second-factor-form
              ref="disableSecondFactorForm"
              :require-password="true"
              instructions="Enter two-factor authenticator code to disable"
              @submit="disableSecondFactor"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <spinner v-else-if="!otpAuth" />
      <mdb-col v-else lg="6">
        <qriously
          :value="otpAuth"
          :padding="25"
          :size="320"
          :background-alpha="1.0"
          class="text-center"
        />

        <p class="text-center">Secret key: {{ secret }}</p>

        <mdb-row class="justify-content-center mt-5">
          <mdb-col lg="10">
            <second-factor-form
              ref="enableSecondFactorForm"
              :require-password="requirePassword"
              instructions="Enter two-factor authenticator code to enable"
              @submit="enableSecondFactor"
            />
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbInput } from 'mdbvue'
import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'
import api from '@/utils/api'
import Spinner from '@/components/Spinner'
import SecondFactorForm from '@/components/auth/SecondFactorForm'

export default {
  components: {
    Spinner,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbInput,
    SecondFactorForm
  },
  extends: StoreSync({
    user: () => Models.USER()
  }),
  data() {
    return {
      isSecondFactorEnabled: false,
      secret: null,
      otpAuth: null
    }
  },
  computed: {
    requirePassword() {
      if (this.user.social_id) {
        return false
      }
      return true
    }
  },
  mounted() {
    if (this.user.otp_complete) {
      this.showDisable()
    } else {
      this.showEnable()
    }
  },
  methods: {
    showDisable() {
      this.isSecondFactorEnabled = true
    },
    async showEnable() {
      this.isSecondFactorEnabled = false

      try {
        const { data } = await api.account.getSecondFactorSecret()
        this.secret = data.secret

        this.otpAuth = `otpauth://totp/Coincube:${this.user.email}?secret=${this.secret}&issuer=Coincube`
      } catch (error) {
        this.$toasted.error('Failed to Fetch Secret')
      }
    },
    async disableSecondFactor() {
      try {
        await api.account.removeSecondFactor({
          otp_code: this.$refs.disableSecondFactorForm.code,
          password: this.$refs.disableSecondFactorForm.password
        })
        this.clearCache(Models.USER())
        this.$toasted.success('Disabled Two Factor Authentication')
        this.showEnable()
      } catch (error) {
        this.$toasted.error('Failed to Disable Two Factor Authentication')
      }
    },
    async enableSecondFactor() {
      try {
        await api.account.addSecondFactor({
          otp_code: this.$refs.enableSecondFactorForm.code,
          password: this.$refs.enableSecondFactorForm.password
        })
        this.clearCache(Models.USER())
        this.$toasted.success('Enabled Two Factor Authentication')
        this.showDisable()
      } catch (error) {
        this.$toasted.error('Failed to Enable Two Factor Authentication')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
