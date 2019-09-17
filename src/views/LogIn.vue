<template>
  <mdb-container>
    <br />
    <br />
    <br />
    <mdb-row>
      <mdb-col lg="3" />
      <mdb-col lg="6">
        <sign-in />
      </mdb-col>
      <mdb-col lg="3" />
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue'
import SignIn from '@/components/auth/SignIn'

export default {
  name: 'LogIn',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    SignIn
  }
}
</script>

<style lang="scss" scoped>
.navbar-toggler {
  background-color: black;
}
</style>
