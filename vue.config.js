// vue.config.js
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:443',
        changeOrigin: true
      }
    }
  }
}
