// === File: src/views/ArticleDetailView.vue ===
<template>
  <div class="page-container">
    <div v-if="loading" class="state-message">Memuat artikel...</div>
    <div v-if="error" class="state-message error">{{ error }}</div>

    <div v-if="article">
      <div class="main-layout">
        <main class="main-content">
          <article>
            <div class="article-image-header">
              <img :src="getFullImageUrl(article.imageUrl)" :alt="article.title">
            </div>
            <h1 class="article-title">{{ article.title }}</h1>
            <p class="article-meta">
              Oleh <strong>{{ article.author.name }}</strong> dalam kategori <strong>{{ article.category.name }}</strong><br>
              Dipublikasikan pada {{ formatDate(article.date_posted) }}
            </p>
            <div class="article-content" v-html="formattedContent"></div>
          </article>
          <CommentSection />
        </main>
        <aside class="sidebar-content">
          <LatestArticlesSidebar :articles="latestArticles" />
        </aside>
      </div>
      <RecommendedArticles :articles="recommendedArticles" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '@/services/ApiService';
import { formatDate } from '@/utils/formatDate';
import LatestArticlesSidebar from '@/components/articles/LatestArticlesSidebar.vue';
import CommentSection from '@/components/articles/CommentSection.vue';
import RecommendedArticles from '@/components/articles/RecommendedArticles.vue';

const route = useRoute();
const article = ref(null);
const loading = ref(true);
const error = ref(null);
const latestArticles = ref([]);
const recommendedArticles = ref([]);

const getFullImageUrl = (path) => `http://localhost:5000${path}`;

const fetchArticle = async (id) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await ApiService.getArticle(id);
    article.value = response.data;
    await fetchLatestAndRecommended();
  } catch (err) {
    error.value = 'Artikel tidak ditemukan atau terjadi kesalahan.';
  } finally {
    loading.value = false;
  }
};

const fetchLatestAndRecommended = async () => {
  try {
    const res = await ApiService.getArticles();
    const articles = res.data.filter(a => a.id !== article.value.id);
    latestArticles.value = articles.slice(0, 2);
    recommendedArticles.value = articles.slice(2, 6);
  } catch (err) {
    console.warn('Gagal memuat artikel tambahan.');
  }
};

const formattedContent = computed(() => {
  if (!article.value) return '';
  return article.value.content
    .split(/\n\s*\n/)
    .map(p => `<p>${p.trim()}</p>`)
    .join('');
});

onMounted(() => fetchArticle(route.params.id));
watch(() => route.params.id, (newId) => fetchArticle(newId));
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}
.state-message {
  text-align: center;
  padding: 60px;
  font-size: 1.2em;
  color: #888;
}
.error {
  color: #c53030;
  background-color: #fff5f5;
  border-radius: 8px;
}
.main-layout {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 50px;
}
.main-content {
  max-width: 100%;
}
.sidebar-content {
  position: sticky;
  top: 100px;
  align-self: flex-start;
}
.article-image-header img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 30px;
}
.article-title {
  font-size: 2.8em;
  margin-bottom: 15px;
  line-height: 1.2;
}
.article-meta {
  color: #666;
  font-style: italic;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
.article-content {
  line-height: 1.8;
  font-size: 1.1em;
}
.article-content :deep(p) {
  margin-bottom: 1.5em;
}
</style>
