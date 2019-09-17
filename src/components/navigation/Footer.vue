<template>
  <footer class="page-footer p-4">
    <mdb-container>
      <mdb-row>
        <mdb-col md="3">
          <h5>LEGAL</h5>

          <ul class="footer-links">
            <li class="footer-item">
              <a href="#" class="footer-link" @click="toggleTermsModal">License Terms</a>
            </li>
            <li class="footer-item">
              <a href="#" class="footer-link" @click="toggleSiteModal">Credits</a>
            </li>
          </ul>
        </mdb-col>

        <mdb-col md="3">
          <h5>INFO</h5>

          <ul class="footer-links">
            <li class="footer-item">
              <a href="/assets" class="footer-link">Assets</a>
            </li>
            <li class="footer-item">
              <a href="/faq" class="footer-link">FAQ</a>
            </li>
          </ul>
        </mdb-col>

        <mdb-col md="3">
          <h5>SOCIAL</h5>

          <ul class="footer-links">
            <li class="footer-item">
              <a href="https://t.me/coincube" target="_blank" class="footer-link">Telegram</a>
            </li>
            <li class="footer-item">
              <a href="https://twitter.com/coincube" target="_blank" class="footer-link">Twitter</a>
            </li>
            <li class="footer-item">
              <a
                href="https://www.facebook.com/coincube.io"
                target="_blank"
                class="footer-link"
              >Facebook</a>
            </li>
          </ul>
        </mdb-col>
      </mdb-row>

      <mdb-row class="ml-1">
        <small>&copy; 2019 Coin Cube LLC</small>
      </mdb-row>

      <basic-modal
        :modal-title="'License Terms'"
        :show-modal="showTermsModal"
        :toggle-modal="toggleTermsModal"
      >
        <Terms />
      </basic-modal>

      <basic-modal
        :modal-title="'Credits'"
        :show-modal="showSiteModal"
        :toggle-modal="toggleSiteModal"
      >
        <Sites />
      </basic-modal>
    </mdb-container>
  </footer>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol } from 'mdbvue'
import BasicModal from '@/components/modals/BasicModal'
import Terms from '@/components/Terms'
import Sites from '@/components/Sites'

export default {
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    BasicModal,
    Terms,
    Sites
  },
  data() {
    return {
      showTermsModal: false,
      showSiteModal: false
    }
  },
  methods: {
    toggleTermsModal() {
      this.showTermsModal = !this.showTermsModal
    },
    toggleSiteModal() {
      this.showSiteModal = !this.showSiteModal
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.footer-links {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

.footer-link {
  font-size: 0.9em;
  font-weight: 500;
  color: $coincube-dark;
}

h5 {
  font-weight: 400;
  color: $coincube-dark;
}
</style>
