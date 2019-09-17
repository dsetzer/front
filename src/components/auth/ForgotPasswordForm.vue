<template>
  <form @submit.prevent="validateAndSubmit">
    <mdb-container class="p-4">
      <h4 class="forgot-password-header my-3 text-white">Forgot Password</h4>
      <p
        class="forgot-password-text text-white"
      >Enter the email address associated with your account</p>
      <mdb-input
        v-validate="'required|email'"
        v-model="email"
        name="email-forgot-password"
        type="email"
        label="Email Address"
        data-vv-as="email"
      />
      <div
        v-show="errors.has('email-forgot-password')"
        class="error mb-4"
      >{{ errors.first('email-forgot-password') }}</div>

      <div v-show="isPasswordReset" class="success mb-4">
        If there is an account associated with this email address,
        a recovery email has been sent.
      </div>

      <mdb-btn color="primary" class="btn-submit btn-block mb-2 mt-4" type="submit">SEND EMAIL</mdb-btn>
      <p class="forgot-password-text">
        <a class="text-white" @click="$emit('cancel')">Cancel</a>
      </p>
    </mdb-container>
  </form>
</template>

<script>
import { mdbBtn, mdbContainer, mdbInput } from 'mdbvue'

export default {
  name: 'ForgotPasswordForm',
  components: {
    mdbBtn,
    mdbContainer,
    mdbInput
  },
  props: {
    isPasswordReset: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      email: ''
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

.form-control {
  color: $coincube-text !important;
}

.forgot-password-text {
  text-align: center;
  color: $coincube-accent;
}

.error {
  color: $coincube-error;
}

.success {
  color: $coincube-green;
}

.forgot-password-header {
  text-align: center;
}

form /deep/ .md-form .prefix ~ input,
form /deep/ .md-form .prefix ~ textarea {
  margin-left: 2.5rem;
  margin-bottom: 2em;
}
</style>
