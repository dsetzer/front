// vue.config.js
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/api': {
        target: {
          host: 'flask',
          protocol: 'http:',
          port: 443
        },
        changeOrigin: true
      }
    }
  }
}

