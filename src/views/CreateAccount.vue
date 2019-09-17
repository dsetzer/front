<template>
  <mdb-container>
    <br />
    <br />
    <mdb-row>
      <mdb-col lg="3" />
      <mdb-col lg="6">
        <sign-up />
      </mdb-col>
      <mdb-col lg="3" />
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue'
import SignUp from '@/components/auth/SignUp'

export default {
  name: 'CreateAccount',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    SignUp
  }
}
</script>

<style lang="scss" scoped>
</style>
