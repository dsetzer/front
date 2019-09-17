/**
 * @param {number} number - number to round
 * @param {number} precision - decimals
 * @returns {number}
 * @example
 *   // returns 2418.75
 *   console.log(precisionRound(2418.73672264795, 2));
 */

const precisionRound = (number, precision) => {
  const factor = 10 * precision
  return Math.round(number * factor) / factor
}

export default precisionRound
