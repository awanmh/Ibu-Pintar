<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} Ibu Sehat Bahagia. All rights reserved.</p>
      <div class="social-links">
        <a href="https://www.instagram.com/ibupintar_byaisyalfi" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="#">TikTok</a>
        <a href="https://wa.me/6285230774144" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'; // Tambahkan import ref jika menggunakan script setup

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
/* ... (CSS yang sama) ... */
.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #e7e7e7;
  padding: 20px 0;
  text-align: center;
  color: #666;
  margin-top: 40px;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}
.social-links a {
  margin: 0 10px;
  color: #ff69b4;
  text-decoration: none;
}
.social-links a:hover {
  text-decoration: underline;
}
</style>