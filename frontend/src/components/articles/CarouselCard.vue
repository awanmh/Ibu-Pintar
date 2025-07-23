<template>
  <div class="carousel-card">
    <router-link :to="`/articles/${article.id}`" class="card-link">
      <div class="card-image">
        <img
          :src="getImageUrl(article)"
          :alt="article.title || 'Gambar artikel'"
          loading="lazy"
        />
      </div>
    </router-link>
  </div>
</template>

<script setup>
const BASE_URL = 'http://localhost:5000'; // ubah sesuai kebutuhan

const getImageUrl = (article) => {
  if (!article.imageUrl) return '/images/default-cover.jpg';
  return article.imageUrl.startsWith('http')
    ? article.imageUrl
    : `${BASE_URL}${article.imageUrl}`;
};

defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.carousel-card {
  flex: 0 0 32%;
  width: 32%;
  scroll-snap-align: start;
  overflow: hidden;
  padding: 0.5rem;
  box-sizing: border-box;
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
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

@media (max-width: 768px) {
  .carousel-card {
    flex: 0 0 80%;
    width: 80%;
  }
}
</style>
