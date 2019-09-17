<template>
  <mdb-row>
    <mdb-col sm="12" class="spinner-container">
      <img class="spinner-img" src="../assets/img/loading.gif" />
    </mdb-col>
  </mdb-row>
</template>

<script>
import { mdbRow, mdbCol } from 'mdbvue'

export default {
  components: {
    mdbRow,
    mdbCol
  }
}
</script>


<style lang="scss" scoped>
@import 'custom';

.loggedIn .spinner-container {
  background-color: $coincube-dark;
  z-index: 3;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  .spinner-img {
    max-width: 70%;
    height: auto;
  }

  @media (min-width: 768px) {
    .main-content .spinner-img {
      max-width: 50%;
    }

    .spinner-img {
      max-width: 30%;
    }
  }
}
</style>
