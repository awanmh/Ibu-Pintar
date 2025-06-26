<template>
  <div class="sidebar-widget">
    <h3 class="widget-title">Artikel Terbaru</h3>
    <div class="article-list">
      <div v-for="article in articles" :key="article.id" class="article-item">
        <router-link :to="`/articles/${article.id}`" class="article-link">
          <img :src="article.image" :alt="article.title" class="article-image">
          <span class="article-title">{{ article.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.sidebar-widget {
  width: 100%;
}
.widget-title {
  font-size: 1.4em;
  margin-bottom: 20px;
  border-bottom: 3px solid #ff69b4;
  padding-bottom: 10px;
}
.article-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.article-item .article-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  gap: 15px;
}
.article-item .article-link:hover .article-title {
  color: #ff69b4;
}
.article-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}
.article-title {
  font-weight: 600;
  line-height: 1.4;
}
</style>
