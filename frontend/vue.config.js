module.exports = defineConfig({
  publicPath: '/',
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target: 'https://bibupintar-production.up.railway.app', // Ganti dengan URL backend Railway
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      }
    }
  }
});
