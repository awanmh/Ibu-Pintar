<template>
  <div :class="cardClasses" class="card-animate">
    <div v-if="article.imageUrl" class="card-image">
      <router-link :to="`/articles/${article.id}`">
        <img :src="article.imageUrl" :alt="article.title" />
      </router-link>
    </div>
    <div class="card-content">
      <span v-if="!isSide" class="category-tag">{{ article.category.name }}</span>
      <h3 class="card-title">
        <router-link :to="`/articles/${article.id}`">{{ article.title }}</router-link>
      </h3>
      <p v-if="isHero" class="card-excerpt">
        {{ article.content.substring(0, 150) }}...
      </p>
      <p class="card-meta">
        Oleh <strong>{{ article.author.name }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  article: { type: Object, required: true },
  isHero: { type: Boolean, default: false },
  isSide: { type: Boolean, default: false },
});

const cardClasses = computed(() => [
  'article-card',
  { 'is-hero': props.isHero },
  { 'is-side': props.isSide },
]);
</script>

<style scoped>
/* Animasi saat muncul */
.card-animate {
  animation: fadeInScale 0.6s ease forwards;
  opacity: 0;
  transform: scale(0.97);
}

/* Base Card Style */
.article-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.article-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
}

/* Gambar */
.card-image img {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background-color: #f0f0f0;
  transition: transform 0.4s ease;
}
.card-image img:hover {
  transform: scale(1.03);
}

/* Konten */
.card-content {
  padding: 16px;
  flex-grow: 1;
}
.card-title {
  font-size: 1.1em;
  margin: 6px 0;
  line-height: 1.4;
  font-weight: 600;
}
.card-title a {
  text-decoration: none;
  color: #2d3748;
  transition: color 0.2s;
}
.card-title a:hover {
  color: #ec4899;
}
.card-meta {
  font-size: 0.8em;
  color: #718096;
  margin-top: auto;
  padding-top: 10px;
}
.category-tag {
  font-size: 0.75em;
  font-weight: bold;
  color: #ec4899;
  text-transform: uppercase;
}

/* Hero Style */
.article-card.is-hero {
  border: none;
  box-shadow: none;
}
.article-card.is-hero:hover {
  transform: none;
  box-shadow: none;
}
.article-card.is-hero .card-title {
  font-size: 2em;
}
.article-card.is-hero .card-content {
  padding: 20px 0 0 0;
}
.article-card.is-hero .card-excerpt {
  margin: 15px 0;
  color: #4a5568;
  font-size: 1.1em;
}

/* Side Style */
.article-card.is-side {
  flex-direction: row;
  align-items: center;
  border: none;
  border-bottom: 1px solid #eee;
  border-radius: 0;
  padding-bottom: 15px;
  background: transparent;
}
.article-card.is-side:hover {
  transform: none;
  box-shadow: none;
}
.article-card.is-side .card-image {
  flex: 0 0 100px;
  margin-right: 15px;
}
.article-card.is-side .card-content {
  padding: 0;
}
.article-card.is-side .card-title {
  font-size: 1em;
}

/* Animasi Fade Scale */
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.97);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
