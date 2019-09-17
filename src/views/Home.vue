<template>
  <div class="home">
    <br />
    <br />
    <mdb-row>
      <mdb-col />
      <mdb-col>
        <SignUp />
      </mdb-col>
      <mdb-col />
    </mdb-row>
  </div>
</template>

<script>
import { mdbCol, mdbRow } from 'mdbvue'
import SignUp from '@/components/auth/SignUp'

export default {
  name: 'home',
  components: {
    mdbCol,
    mdbRow,
    SignUp
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

// .home img {
//   max-width: 2000px;
//   padding-top: 40px;
//   padding-bottom: 20px;
// }
// .home h1 {
//   color: $coincube-blue;
// }
</style>
