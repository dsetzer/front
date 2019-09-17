<template>
  <mdb-container class="pt-4 settings-password">
    <mdb-row class="justify-content-center">
      <mdb-col lg="6">
        <p class="h3-responsive text-center">Please enter your new password below.</p>
        <mdb-row class="justify-content-center">
          <mdb-col lg="10">
            <form ref="form" @submit.prevent="handleSubmit">
              <div class="mb-4">
                <mdb-input
                  v-validate="'required'"
                  v-model="password"
                  name="password"
                  type="password"
                  label="Current Password"
                  icon="key"
                />
              </div>
              <div
                v-show="errors.has('password')"
                class="text-danger mb-2"
              >{{ errors.first('password') }}</div>
              <div class="mb-4">
                <mdb-input
                  v-validate="'required'"
                  ref="new_password"
                  v-model="new_password"
                  name="new_password"
                  type="password"
                  label="New Password"
                  icon="key"
                />
              </div>
              <div
                v-show="errors.has('new_password')"
                class="text-danger mb-2"
              >{{ errors.first('new_password') }}</div>
              <mdb-btn
                :disabled="!valid"
                color="primary"
                class="btn-submit btn-block mb-2 mt-4 nw-account-password-submit"
                type="submit"
              >Submit</mdb-btn>
            </form>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbInput } from 'mdbvue'

import api from '@/utils/api'

export default {
  name: 'SettingsPassword',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbInput
  },
  data() {
    return {
      password: '',
      new_password: ''
    }
  },
  computed: {
    isComplete() {
      return this.password.length > 0 && this.new_password.length > 0
    },
    valid() {
      return !this.errors.any() && this.isComplete
    }
  },
  methods: {
    clearForm() {
      this.password = ''
      this.new_password = ''
      this.$validator.reset()
      this.$refs.form.reset()
    },
    /* eslint-disable */
    async handleSubmit() {
      const isValid = await this.$validator.validateAll()
      if (!isValid) return
      try {
        const res = await api.account.savePassword({
          password: this.password,
          new_password: this.new_password
        })
        this.$toasted.success('Password updated.')
      } catch (e) {
        console.log(e)
      } finally {
        this.clearForm()
      }
    }
    /* eslint-enable */
  }
}
</script>

<style lang="scss">
@import 'custom';

.button {
  color: $coincube-dark !important;
}

.btn {
  font-weight: 700;
}
</style>
