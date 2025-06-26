<template>
  <div class="page-container animate-fade-in">
    <div v-if="status === 'loading'" class="loading">Memuat artikel...</div>
    <div v-if="status === 'error'" class="error">Gagal memuat artikel. Silakan coba lagi nanti.</div>

    <div v-if="status === 'success' && allArticles.length > 0">
      <!-- Bagian Atas: Hero & Artikel Pendamping -->
      <div class="top-section-grid">
        <!-- Artikel Utama (Hero) -->
        <div class="hero-article animate-slide-up">
          <ArticleCard :article="mainArticle" :is-hero="true" />
        </div>
        <!-- Artikel Pendamping -->
        <div class="side-articles">
          <ArticleCard
            v-for="article in sideArticles"
            :key="article.id"
            :article="article"
            :is-side="true"
            class="animate-slide-up delay"
          />
        </div>
      </div>

      <!-- Bagian Bawah: Grid Artikel Lainnya -->
      <div class="more-articles-section animate-fade-in">
        <h2 class="section-title">Artikel Lainnya</h2>
        <div class="more-articles-grid">
          <ArticleCard
            v-for="article in remainingArticles"
            :key="article.id"
            :article="article"
            class="animate-fade-in delay"
          />
        </div>
      </div>
    </div>

    <div v-else-if="status === 'success' && allArticles.length === 0" class="empty-state">
      <p>Belum ada artikel yang dipublikasikan.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ArticleCard from '@/components/articles/ArticleCard.vue';

const store = useStore();
const allArticles = computed(() => store.getters['articles/allArticles']);
const status = computed(() => store.state.articles.status);

const mainArticle = computed(() => allArticles.value[0] || null);
const sideArticles = computed(() => allArticles.value.slice(1, 4));
const remainingArticles = computed(() => allArticles.value.slice(4));

onMounted(() => {
  store.dispatch('articles/fetchArticles');
});
</script>

<style scoped>
/* Global container */
.page-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

/* State messages */
.loading, .error, .empty-state {
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
  color: #888;
  animation: fadeIn 0.6s ease-in-out;
}

/* Grid utama */
.top-section-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-bottom: 50px;
}

/* Artikel pendamping */
.side-articles {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Bagian bawah */
.more-articles-section {
  margin-top: 40px;
}

.section-title {
  font-size: 1.8em;
  font-weight: 600;
  border-bottom: 2px solid #f48fb1;
  padding-bottom: 10px;
  margin-bottom: 30px;
  color: #333;
}

/* Artikel grid */
.more-articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

/* Animasi modern */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease forwards;
}

.animate-slide-up {
  animation: slideUp 0.9s ease forwards;
}

.delay {
  animation-delay: 0.2s;
}

/* Tambahan interaktif */
.ArticleCard:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

</style>
