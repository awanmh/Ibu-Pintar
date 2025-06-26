c<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} Ibu Sehat Bahagia. All rights reserved.</p>
      <div class="social-links">
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">WhatsApp</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
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