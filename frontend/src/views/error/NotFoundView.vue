<template>
  <div class="not-found-container">
    <h1>404</h1>
    <h2>Halaman Tidak Ditemukan</h2>
    <p>Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.</p>
    <router-link to="/">
      <AppButton variant="primary">Kembali ke Beranda</AppButton>
    </router-link>
  </div>
</template>

<script setup>
import AppButton from '@/components/common/AppButton.vue';
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  text-align: center;
}
h1 {
  font-size: 6em;
  margin: 0;
  color: #ff69b4;
}
h2 {
  font-size: 2em;
}
</style>