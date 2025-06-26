<template>
  <div class="carousel-card">
    <router-link :to="`/articles/${article.id}`" class="card-link">
      <div class="card-image">
        <img :src="article.image" :alt="article.title">
      </div>
      <!-- Konten bisa ditambahkan di sini jika perlu, seperti judul -->
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.carousel-card {
  /* Tentukan lebar setiap kartu dan pastikan tidak menyusut */
  flex: 0 0 32%; /* Menampilkan sekitar 3 kartu sekaligus */
  width: 32%;
  scroll-snap-align: start; /* Untuk smooth scrolling snap */
  overflow: hidden;
}

.card-link {
  display: block;
  text-decoration: none;
}

.card-image img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  transition: transform 0.3s ease;
}

.card-link:hover .card-image img {
  transform: scale(1.05);
}

/* Penyesuaian untuk layar lebih kecil */
@media (max-width: 768px) {
  .carousel-card {
    flex: 0 0 80%;
    width: 80%;
  }
}
</style>
