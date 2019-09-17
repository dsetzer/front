<template>
  <div>
    <mdb-container fluid class="base">
      <form @submit.prevent="validateBeforeSubmit">
        <h1 class="text-center">Create Account</h1>
        <mdb-row>
          <mdb-col>
            <mdb-input
              v-validate="'required'"
              v-model="signUpData.username"
              class="nw-register-name"
              name="user_name"
              type="text"
              label="Your Name"
              icon="user"
            />
            <div
              v-show="errors.has('user_name')"
              class="error mb-4 nw-register-name-error"
            >{{ errors.first('user_name') }}</div>

            <mdb-input
              v-validate="'required|email'"
              v-model="signUpData.email"
              class="nw-register-email"
              name="email"
              type="text"
              label="Email Address"
              icon="envelope"
            />
            <div
              v-show="errors.has('email')"
              class="error mb-4 nw-register-email-error"
            >{{ errors.first('email') }}</div>

            <mdb-input
              v-validate="'required'"
              v-model="signUpData.password"
              class="nw-register-password"
              name="password"
              type="password"
              label="Password"
              icon="lock"
            />
            <div
              v-show="errors.has('password')"
              class="error nw-register-password-error"
            >{{ errors.first('password') }}</div>

            <mdb-input
              v-validate="'required'"
              v-model="confirm_password"
              class="nw-register-password-confirm"
              name="confirm_password"
              type="password"
              label="Confirm Password"
              icon="lock"
            />
            <div
              v-show="errors.has('confirm_password')"
              class="error nw-register-password-confirm-error"
            >{{ errors.first('confirm_password') }}</div>

            <mdb-btn
              class="btn btn-primary btn-submit btn-block mb-2 mt-4 nw-register-signup"
              type="submit"
            >CREATE ACCOUNT</mdb-btn>
          </mdb-col>
        </mdb-row>
      </form>
    </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn } from 'mdbvue'
import featureFlags from '@/utils/featureFlags'

export default {
  name: 'SignUp',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbBtn
  },
  data() {
    return {
      confirm_password: '',
      signUpData: {
        username: '',
        email: '',
        password: ''
      },
      showPrivacyModal: false,
      showTermsModal: false,
      featureFlags
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.register()
        }
      })
    },
    register() {
      let toast = this.$toasted.info('Signing up...')
      this.$auth.register({
        // This object must be named data for vue-auth to work right. Do not rename.
        data: { ...this.signUpData },
        autoLogin: false,
        rememberMe: true,
        success(result) {
          if (result.status === 200) {
            toast.goAway()
            toast = this.$toasted.success('Signed up!')
            this.$router.push(`/account`)
          }
        },
        error(error) {
          if (error.response && error.response.status === 403) {
            toast.goAway()
            toast = this.$toasted.error(error.response.data.message)
          } else {
            toast.goAway()
            toast = this.$toasted.error('Sign up failed')
          }
        }
      })
    },
    togglePrivacyModal() {
      this.showPrivacyModal = !this.showPrivacyModal
    },
    toggleTermsModal() {
      this.showTermsModal = !this.showTermsModal
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.form-control {
  color: $coincube-text !important;
}
.error {
  color: $coincube-error;
}
.custom-hr {
  line-height: 13px;
  border-bottom: solid 1px #fff;
  margin-right: 0px;
}
.coincube-accent {
  color: $coincube-accent;
}
.base h4 {
  text-align: center;
}
</style>
