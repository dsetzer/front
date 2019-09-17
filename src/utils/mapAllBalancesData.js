const mapAllBalancesData = array =>
  array.length === 0
    ? []
    : array.map(value => ({
        asset: value[0], // The asset's ticker, as in BTC, ETH, LTC
        total: value[1], // The currently held amount of the asset
        btcRate: value[2], // The value of 1 unit of the asset, in BTC
        btcValue: value[3], // The value of the asset, in BTC
        fiatValue: value[4], // The value of the asset, in Fiat
        fiatRate: value[4] / value[1], // The value of 1 unit of the asset, in Fiat
        portfolioPercent: value[5], // Current percent of portfolio
        targetPercent: value[6], // Desired percent of portfolio
        offByPercent: value[7] // The discrepancy between current and desired
      }))

export default mapAllBalancesData
