<template>
  <div class="compact-card">
    <router-link :to="`/articles/${article.id}`" class="card-link">
      <div class="card-image">
        <img :src="article.image" :alt="article.title">
      </div>
      <div class="card-content">
        <h4 class="card-title">{{ article.title }}</h4>
      </div>
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
.compact-card {
  overflow: hidden;
  background-color: white;
}
.card-link {
  text-decoration: none;
  color: #333;
}
.card-image img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}
.card-link:hover .card-image img {
  transform: scale(1.05);
}
.card-content {
  padding-top: 10px;
}
.card-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  /* Batasi judul menjadi 3 baris */
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
.card-link:hover .card-title {
  color: #ff69b4;
}
</style>
