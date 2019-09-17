const mapAccountValuationsData = array =>
  array.length === 0
    ? []
    : array.map(value => ({
        name: value.name,
        // data: Object.keys(value.values).map(v => value.values[v]),
        data: [].concat(value.values.val_fiat)
      }))

export default mapAccountValuationsData
