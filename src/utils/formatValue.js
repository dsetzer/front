const formatValue = (value, decimalPlaces) => {
  const val = value.toFixed(decimalPlaces)
  const parts = val.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export default formatValue
