<template>
  <div class="page-container">
    <div v-if="loading" class="state-message">Memuat artikel...</div>
    <div v-if="error" class="state-message error">{{ error }}</div>
    
    <div v-if="article">
      <div class="main-layout">
        <!-- Kolom Konten Utama -->
        <main class="main-content">
          <article>
            <div class="article-image-header">
              <img :src="article.image" :alt="article.title">
            </div>

            <h1 class="article-title">{{ article.title }}</h1>
            <p class="article-meta">
              Oleh <strong>{{ article.author.name }}</strong> dalam kategori <strong>{{ article.category.name }}</strong>
              <br>
              Dipublikasikan pada {{ formatDate(article.date_posted) }}
            </p>
            
            <div class="article-content" v-html="formattedContent"></div>
          </article>

          <!-- Komponen Komentar diletakkan di sini -->
          <CommentSection />
        </main>

        <!-- Kolom Sidebar -->
        <aside class="sidebar-content">
          <LatestArticlesSidebar :articles="latestArticles" />
        </aside>
      </div>

      <!-- Bagian Rekomendasi diletakkan di sini -->
      <RecommendedArticles :articles="recommendedArticles" />
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { dummyArticles } from '@/data/articles.js'; 
import { formatDate } from '@/utils/formatDate.js';

// Impor semua komponen yang dibutuhkan
import LatestArticlesSidebar from '@/components/articles/LatestArticlesSidebar.vue';
import CommentSection from '@/components/articles/CommentSection.vue';
import RecommendedArticles from '@/components/articles/RecommendedArticles.vue';

const route = useRoute();
const article = ref(null);
const loading = ref(true);
const error = ref(null);

// Fungsi terpusat untuk mengambil data artikel
const fetchArticleData = (id) => {
  loading.value = true;
  article.value = null;
  error.value = null;

  if (!dummyArticles || !Array.isArray(dummyArticles)) {
    error.value = "Gagal memuat data dummy. Periksa nama atau lokasi file 'src/data/articles.js'.";
    loading.value = false;
    return;
  }

  const foundArticle = dummyArticles.find(a => a.id === parseInt(id));

  if (foundArticle) {
    article.value = foundArticle;
  } else {
    error.value = `Artikel dengan ID "${id}" tidak ditemukan.`;
  }
  
  loading.value = false;
};

// Computed property untuk memformat konten menjadi paragraf HTML
const formattedContent = computed(() => {
  if (!article.value) return '';
  return article.value.content
    .split(/\n\s*\n/)
    .map(paragraph => `<p>${paragraph.trim()}</p>`)
    .join('');
});

// ### LOGIKA DIPERBARUI DI SINI ###

// Computed property untuk daftar artikel terbaru di sidebar
const latestArticles = computed(() => {
  if (!article.value) return [];
  // Ambil 2 artikel lain yang bukan artikel yang sedang dibaca untuk sidebar
  return dummyArticles
    .filter(a => a.id !== article.value.id)
    .slice(0, 2);
});

// Computed property untuk daftar artikel rekomendasi
const recommendedArticles = computed(() => {
    if (!article.value) return [];
    // Buat daftar ID artikel yang sudah ditampilkan (di konten utama dan sidebar)
    const excludedIds = [article.value.id, ...latestArticles.value.map(a => a.id)];
    // Ambil sisa artikel (maksimal 4) yang belum ditampilkan
    return dummyArticles
        .filter(a => !excludedIds.includes(a.id))
        .slice(0, 4);
});


// Panggil data saat komponen pertama kali dimuat
onMounted(() => {
  fetchArticleData(route.params.id);
});

// Panggil ulang data jika ID di URL berubah (misal: saat klik link di sidebar)
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchArticleData(newId);
    window.scrollTo(0, 0);
  }
});
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}
.state-message { text-align: center; padding: 60px; font-size: 1.2em; color: #888; }
.error { color: #c53030; background-color: #fff5f5; border-radius: 8px; }

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
