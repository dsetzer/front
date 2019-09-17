<template>
  <mdb-card>
    <mdb-card-body>
      <h1 class="text-center">Log In</h1>
      <forgot-password-form
        v-if="isForgettingPassword"
        ref="forgotPasswordForm"
        :is-password-reset="isPasswordReset"
        @cancel="signInResetCancel"
        @submit="submitPasswordReset"
      />
      <second-factor-form
        v-else-if="isTwoFactor"
        ref="secondFactorForm"
        :require-password="false"
        instructions="Enter two-factor authenticator code"
        @submit="signInSecondFactor"
      />
      <sign-in-form v-else ref="signInForm" @reset="signInReset" @submit="signIn" />
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import { mdbCard, mdbCardBody, mdbCardTitle } from 'mdbvue'
import api from '@/utils/api'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInForm from './SignInForm'
import SecondFactorForm from './SecondFactorForm'

export default {
  name: 'SignIn',
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    SignInForm,
    SecondFactorForm,
    ForgotPasswordForm
  },
  data() {
    return {
      isForgettingPassword: false,
      isPasswordReset: false,
      isTwoFactor: false,
      timestamp: null,
      token: null,
      userId: null
    }
  },
  methods: {
    successfulLogin(result) {
      if (result.data.second_factor) {
        this.$auth.token(null, null)
        this.$auth.watch.authenticated = false
        // We can't simply save the object, because the strings convert to numbers.
        this.timestamp = result.data.second_factor.timestamp
        this.token = result.data.second_factor.token
        this.userId = result.data.second_factor.user_id
        this.role = result.data.second_factor.role
        this.isTwoFactor = true
        this.$toasted.global.info('Two Factor Authentication Required')
      } else {
        this.$toasted.global.success('Signed in!')
        console.log(this.$auth.token)
        this.$router.push('/account')
        this.$emit('requestClose')
      }
    },
    failedLogin(error) {
      this.$auth.token(null, null)
      this.$auth.watch.authenticated = false
      if (error.response && error.response.status === 401) {
        this.$toasted.global.error('Incorrect username or password.')
      } else if (error.response && error.response.status === 403) {
        this.$router.push(`/unconfirmed/${error.response.data.message}`)
        this.$emit('requestClose')
      } else {
        console.error(error)
        this.$toasted.global.error('Sign In Failed')
      }
    },
    signIn() {
      const toast = this.$toasted.global.info('Signing in...')
      this.$auth.login({
        // This object must be named data for vue-auth to work right. Do not rename.
        data: {
          email: this.$refs.signInForm.email,
          password: this.$refs.signInForm.password
        },
        success(result) {
          toast.goAway()
          this.successfulLogin(result)
        },
        error(error) {
          toast.goAway()
          this.failedLogin(error)
        }
      })
    },
    async signInSecondFactor() {
      const toast = this.$toasted.global.info('Signing in...')
      try {
        const { headers } = await api.auth.postSecondFactor({
          otp_code: this.$refs.secondFactorForm.code,
          timestamp: this.timestamp.toString(),
          token: this.token,
          user_id: this.userId.toString()
        })
        toast.goAway()
        this.$toasted.global.success('Signed in!')
        this.$auth.token(null, headers.authorization)
        this.$auth.watch.authenticated = true
        // Required to persist the user across page refreshes
        document.cookie = 'rememberMe=false'
        if (this.role === 'Admin') {
          this.$router.push('/admin')
        } else {
          this.$router.push('/account')
        }
        this.$emit('requestClose')
      } catch (error) {
        toast.goAway()
        if (error.response && error.response.status === 401) {
          this.$toasted.global.error('Incorrect username or password.')
        } else {
          this.$toasted.global.error('Sign In Failed')
        }
      }
    },
    signInReset() {
      // TODO: reset auth
      this.isForgettingPassword = true
    },
    signInResetCancel() {
      // TODO: reset auth
      this.isForgettingPassword = false
      this.isPasswordReset = false
      this.$refs.forgotPasswordForm.email = ''
    },
    async submitPasswordReset() {
      let toast = this.$toasted.global.info('Resetting password...')
      const { status } = await api.auth.postResetPassword(
        this.$refs.forgotPasswordForm.email
      )

      if (status === 200) {
        this.isPasswordReset = true
        toast.goAway()
      } else {
        toast.goAway()
        toast = this.$toasted.global.error('Reset Password Failed')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base {
  border-radius: 2px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.15);
  min-width: 300px;
}
</style>
