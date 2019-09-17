<template>
  <div class="legal">
    <p>
      Coin market capitalization data powered by
      <a
        href="https://coinmarketcap.com"
        target="_blank"
      >CoinMarketCap</a>
    </p>
  </div>
</template>
<script>
export default {
  name: 'Sites'
}
</script>

<style lang="scss" scoped>
@import 'custom';

p {
  color: $coincube-text;
}

p > a {
  color: $coincube-accent;
}
</style>