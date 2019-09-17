const jwtAuth = {
  request(req, comboTokenString) {
    console.log(req)
    console.log(comboTokenString)
    // If no token, don't try to send it.
    if (!comboTokenString) {
      // eslint-disable-next-line no-underscore-dangle
      this.options.http._setHeaders.call(this, req, {})
      return
    }

    const comboTokenFixed = comboTokenString.replace(/'/g, '"')
    const comboTokenJSON = JSON.parse(comboTokenFixed)

    const cleanUpToken = token => {
      let cleanedToken = token.split(/Bearer:?\s?/i)

      cleanedToken = cleanedToken[cleanedToken.length > 1 ? 1 : 0].trim()

      return cleanedToken
    }

    const cleanedAccessToken = cleanUpToken(comboTokenJSON.access_token)
    const cleanedRefreshToken = cleanUpToken(comboTokenJSON.refresh_token)

    const accessHeaders = { Authorization: `Bearer ${cleanedAccessToken}` }
    const refreshHeaders = { Authorization: `Bearer ${cleanedRefreshToken}` }

    if (req.isRefresh || req.isRefreshLogout) {
      if (req.isRefreshLogout) {
        // eslint-disable-next-line no-param-reassign
        req.url += '_refresh'
      }

      // eslint-disable-next-line no-underscore-dangle
      this.options.http._setHeaders.call(this, req, refreshHeaders)
    } else {
      if (req.isAccessLogout) {
        // eslint-disable-next-line no-param-reassign
        req.url += '_access'
      }

      // eslint-disable-next-line no-underscore-dangle
      this.options.http._setHeaders.call(this, req, accessHeaders)
    }
  },

  response(res) {
    // eslint-disable-next-line no-underscore-dangle
    const headers = this.options.http._getHeaders.call(this, res)

    const comboTokenString =
      headers.Authorization || headers.authorization || null

    return comboTokenString
  }
}

export default jwtAuth
