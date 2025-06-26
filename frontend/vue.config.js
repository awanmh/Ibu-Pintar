// frontend/vue.config.js

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // Di sini kita menambahkan konfigurasi untuk development server
  devServer: {
    // Atur port yang Anda inginkan
    port: 8081
  }
});