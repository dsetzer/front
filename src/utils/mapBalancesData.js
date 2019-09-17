const mapBalancesData = array =>
  array.length === 0
    ? []
    : array.map(value => ({
        asset: value[0], // The asset's ticker, as in BTC, ETH, LTC
        total: value[1], // The currently held amount of the asset
        btcRate: value[2], // The value of 1 unit of the asset, in BTC
        fiatRate: value[7] / value[1], // The value of 1 unit of the asset, in Fiat
        btcValue: value[6], // The value of the asset, in BTC
        fiatValue: value[7], // The value of the asset, in Fiat
        btcHourChange: value[3] * 100, // Percent that BTC value increased or decreased
        btcDayChange: value[4] * 100, // Percent that BTC value increased or decreased
        btcWeekChange: value[5] * 100, // Percent that BTC value increased or decreased
        portfolioPercent: value[8], // Current percent of portfolio
        targetPercent: value[9], // Desired percent of portfolio
        offByPercent: value[10] // The discrepancy between current and desired
      }))

export default mapBalancesData
