<template>
  <mdb-container class="pt-4 settings-email">
    <mdb-row class="justify-content-center">
      <mdb-col lg="6">
        <p class="h3-responsive text-center">Please enter your new email address below.</p>
        <div
          class="d-lg-flex text-center text-lg-left justify-content-between align-center-middle px-3"
        >
          <p>Current email address:</p>
          <p class="text-coincube-accent nw-account-email-current-address">{{ user.email }}</p>
        </div>

        <mdb-row class="justify-content-center">
          <mdb-col lg="10">
            <div class="pt-4">
              <form ref="form" @submit.prevent="handleSubmit">
                <mdb-input
                  v-validate="'required|email'"
                  v-model="email"
                  class="nw-account-email-input"
                  name="email"
                  type="email"
                  label="New Email Address"
                  icon="envelope"
                />
                <div
                  v-show="errors.has('email')"
                  class="text-danger mb-2"
                >{{ errors.first('email') }}</div>
                <mdb-input
                  v-validate="'required'"
                  v-model="password"
                  class="nw-account-email-password-input"
                  name="password"
                  type="password"
                  label="Password"
                  icon="key"
                />
                <div
                  v-show="errors.has('password')"
                  class="text-danger mb-2"
                >{{ errors.first('password') }}</div>
                <mdb-btn
                  :disabled="!valid"
                  color="primary"
                  class="btn-submit btn-block mb-2 mt-4 nw-account-email-submit"
                  type="submit"
                >Submit</mdb-btn>
              </form>
            </div>
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

export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbInput
  },
  extends: StoreSync({
    user: () => Models.USER()
  }),
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    isComplete() {
      return this.email.length > 0 && this.password.length > 0
    },
    valid() {
      return !this.errors.any() && this.isComplete
    }
  },
  methods: {
    clearForm() {
      this.email = ''
      this.password = ''
      this.$validator.reset()
      this.$refs.form.reset()
    },
    async handleSubmit() {
      const isValid = await this.$validator.validateAll()
      if (!isValid) return
      let toast = this.$toasted.info('Updating email...')
      try {
        await api.account.saveEmail({
          new_email: this.email,
          password: this.password
        })
        toast.goAway()
        toast = this.$toasted.success('Email updated! Please sign in again.')
        // Sign out user and require login again
        this.$auth.signOut()
      } catch (error) {
        toast.goAway()
        toast = this.$toasted.error('Failed to update email.')
      } finally {
        this.clearForm()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.button {
  color: $coincube-dark !important;
}

.settings-email /deep/ input {
  margin-bottom: 2em;
}

.btn {
  font-weight: 700;
}
</style>
