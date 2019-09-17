<template>
  <div class="account-settings">
    <mdb-container fluid class="settings-wrapper">
      <div class="border-bottom border-dark">
        <mdb-row>
          <mdb-col lg="12">
            <h1 class="text-center">Account Settings</h1>
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col>
            <mdb-tab classic-tabs color="darker" class="d-flex justify-content-center">
              <mdb-tab-item
                :active="tab == 1"
                class="tab-trigger nw-account-portfolio text-sm"
                @click.native.prevent="tab = 1"
              >
                Portfolio
                <span class="d-none d-sm-inline-block">Settings</span>
              </mdb-tab-item>
              <mdb-tab-item
                v-if="!user.social_id"
                :active="tab == 2"
                class="tab-trigger nw-account-email"
                @click.native.prevent="tab = 2"
              >
                Email
                <span class="d-none d-sm-inline-block">Address</span>
              </mdb-tab-item>
              <mdb-tab-item
                v-if="!user.social_id"
                :active="tab == 3"
                class="tab-trigger nw-account-password"
                @click.native.prevent="tab = 3"
              >Password</mdb-tab-item>
              <mdb-tab-item
                :active="tab == 4"
                class="tab-trigger nw-account-two-factor"
                @click.native.prevent="tab = 4"
              >
                <span class="d-none d-sm-inline-block">Two-Factor Authentication</span>
                <span class="d-block d-sm-none">2FA</span>
              </mdb-tab-item>
            </mdb-tab>
          </mdb-col>
        </mdb-row>
      </div>
    </mdb-container>
    <div>
      <mdb-tab-content>
        <transition-group name="slide-toggle">
          <mdb-tab-pane v-show="tab==1" key="tab1">
            <SettingsPortfolio />
          </mdb-tab-pane>

          <mdb-tab-pane v-show="tab==2" key="tab3">
            <SettingsEmail />
          </mdb-tab-pane>

          <mdb-tab-pane v-show="tab==3" key="tab4">
            <SettingsPassword />
          </mdb-tab-pane>

          <mdb-tab-pane v-show="tab==4" key="tab5">
            <SettingsTwoFactor />
          </mdb-tab-pane>
        </transition-group>
      </mdb-tab-content>
    </div>
  </div>
</template>

<script>
import {
  mdbContainer,
  mdbTab,
  mdbTabItem,
  mdbTabContent,
  mdbTabPane,
  mdbRow,
  mdbCol
} from 'mdbvue'

import SettingsPortfolio from '@/views/Settings/SettingsPortfolio'
import SettingsEmail from '@/views/Settings/SettingsEmail'
import SettingsPassword from '@/views/Settings/SettingsPassword'
import SettingsTwoFactor from '@/views/Settings/SettingsTwoFactor'
import featureFlags from '@/utils/featureFlags'
import Models from '@/store/models'
import StoreSync from '@/store/StoreSync'

export default {
  name: 'Settings',
  components: {
    mdbContainer,
    mdbTab,
    mdbTabItem,
    mdbTabContent,
    mdbTabPane,
    mdbRow,
    mdbCol,
    SettingsPortfolio,
    SettingsEmail,
    SettingsPassword,
    SettingsTwoFactor
  },
  extends: StoreSync({
    user: () => Models.USER()
  }),
  data() {
    return {
      tab: '1',
      featureFlags
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'custom';

.account-settings {
  min-height: calc(100vh - 300px);
}

.slide-toggle-enter-active {
  transition: 0.3s ease-in;
  opacity: 1;
  max-height: 500px;
}
.slide-toggle-enter,
.slide-toggle-leave-active {
  opacity: 0;
  max-height: 0;
}
.slide-toggle-leave {
  opacity: 1;
  max-height: 500px;
}

.border-bottom {
  border-bottom-width: 1px !important;
}
.border-dark {
  border-color: $coincube-darker;
}

.settings-wrapper /deep/ .classic-tabs li a {
  border-bottom: 3px solid transparent;

  @media (max-width: 992px) {
    font-size: 0.8em;
    padding: 1em;
  }
}

.settings-wrapper /deep/ .classic-tabs li a.active {
  color: $coincube-accent;
  border-bottom: 3px solid $coincube-accent;
  font-weight: bold;
}
</style>
