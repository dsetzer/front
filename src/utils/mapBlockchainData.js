const mapBlockchainData = array =>
  array.length === 0
    ? []
    : array.map(blockchain => ({
        label: blockchain,
        value: blockchain
      }))

export default mapBlockchainData
