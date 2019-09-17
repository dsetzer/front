<template>
  <form @submit.prevent="validateAndSubmit">
    <mdb-container>
      <mdb-input
        v-validate="'required|email'"
        v-model="email"
        name="email"
        type="email"
        label="Email Address"
        icon="envelope"
        @click.stop
      />
      <div
        v-show="errors.has('email')"
        class="error mb-4 nw-login-email-error"
      >{{ errors.first('email') }}</div>

      <mdb-input
        v-validate="'required'"
        v-model="password"
        name="password"
        type="password"
        label="Password"
        icon="lock"
        @click.stop
      />
      <div
        v-show="errors.has('password')"
        class="error nw-login-password-error"
      >{{ errors.first('password') }}</div>

      <mdb-btn
        color="primary"
        class="btn-submit btn-block mb-2 mt-4 nw-login-button"
        type="submit"
      >LOG IN</mdb-btn>
      <p class="forgot-password">
        <a @click="$emit('reset')">Forgot password?</a>
      </p>
    </mdb-container>
  </form>
</template>

<script>
import { mdbBtn, mdbContainer, mdbInput } from 'mdbvue'

export default {
  name: 'SignInForm',
  components: {
    mdbBtn,
    mdbContainer,
    mdbInput
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async validateAndSubmit() {
      const isValid = await this.$validator.validateAll()

      if (isValid) {
        this.$emit('submit')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.forgot-password {
  text-align: right;
  color: $coincube-accent !important;
}

.error {
  color: $coincube-error;
}
.md-form input {
  color: $coincube-text;
}
</style>
