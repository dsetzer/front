<template>
  <div>
    <form ref="form" @submit.prevent="validateAndSubmit">
      <p class="h5-responsive text-center">{{ instructions }}</p>

      <mdb-container class="p-4">
        <mdb-input
          v-validate="'required'"
          v-model="code"
          name="code"
          label="Two Factor Code"
          icon="qrcode"
        />

        <div v-show="errors.has('code')" class="error">{{ errors.first('code') }}</div>

        <mdb-input
          v-validate="'required'"
          v-if="requirePassword"
          v-model="password"
          name="password"
          type="password"
          label="Password"
          icon="lock"
        />

        <div
          v-if="requirePassword"
          v-show="errors.has('password')"
          class="error"
        >{{ errors.first('password') }}</div>

        <mdb-btn color="primary" class="btn-submit btn-block mb-2 mt-4" type="submit">Submit</mdb-btn>
      </mdb-container>
    </form>
  </div>
</template>

<script>
import { mdbBtn, mdbContainer, mdbInput } from 'mdbvue'

export default {
  name: 'SecondFactorForm',
  components: {
    mdbBtn,
    mdbContainer,
    mdbInput
  },
  props: {
    instructions: {
      type: String,
      required: true
    },
    requirePassword: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      code: '',
      password: ''
    }
  },
  methods: {
    clearForm() {
      this.code = ''
      this.password = ''
      this.$validator.reset()
      this.$refs.form.reset()
    },
    async validateAndSubmit() {
      const isValid = await this.$validator.validateAll()

      if (isValid) {
        try {
          this.$emit('submit')
        } finally {
          this.clearForm()
        }
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

.error {
  color: $coincube-error;
}
</style>
