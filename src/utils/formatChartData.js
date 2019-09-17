import api from './api'

const sortAndJoin = series =>
  series &&
  series
    .sort((asset, asset2) => asset2.y - asset.y)
    .map(asset => asset.name)
    .join(', ')

/**
 * Takes care of all the API calls to get chart & performance data
 * @param {string} type
 * @returns {object}
 * @example
 *   const { series, summary, lastValue, dayPerformance } = await formatChartData('Five');
 */
async function formatChartData(type) {
  // Pie Chart
  const pieResponse = await api.chartPieMcw[`getTop${type}`]()
  const series = pieResponse.data[0].chart
  const summary = sortAndJoin(series[type])

  // Performance
  const performanceResponse = await api.chartPerformanceMcw[`getTop${type}`]()
  const performance = performanceResponse.data[0].performance
  const lastTwo = performance.slice(-2)
  const lastValue = lastTwo[1][1] || 100
  const dayPerformance = (lastTwo[1][1] - lastTwo[0][1]) / lastTwo[0][1]

  return {
    series,
    summary,
    lastValue,
    dayPerformance
  }
}

export default formatChartData
