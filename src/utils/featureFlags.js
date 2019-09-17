export default {
  enableBilling: true,
  enableAlerts: false,
  enableSocialSignin: true,
  enableUserAPI: true,
  enableSignup: process.env.SIGNUP_OVERRIDE || true,
  enableManualWallet: false,
  upgradePro: true,
  enableRogueDetection: false
}
