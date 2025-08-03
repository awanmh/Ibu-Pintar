// vue.config.js

module.exports = {
  publicPath: '/',
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target: 'https://bibupintar-production.up.railway.app',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      }
    }
  }
};
