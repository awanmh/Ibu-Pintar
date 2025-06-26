<template>
  <section class="recommended-section" v-if="articles.length > 0">
    <div class="section-header">
      <h3 class="section-title">Rekomendasi Untukmu</h3>
      <router-link to="/articles" class="see-all-link">Lihat Semua &gt;</router-link>
    </div>
    <div class="articles-grid">
      <!-- Menggunakan komponen kartu yang ringkas -->
      <CompactArticleCard
        v-for="article in articles" 
        :key="article.id" 
        :article="article" 
      />
    </div>
  </section>
</template>

<script setup>
// Impor komponen baru
import CompactArticleCard from '@/components/articles/CompactArticleCard.vue';

defineProps({
  articles: {
    type: Array,
    required: true,
  }
});
</script>

<style scoped>
.recommended-section {
  width: 100%;
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid #fce4ec; /* Warna pink muda */
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.section-title {
  font-size: 1.8em;
  text-transform: uppercase;
}
.see-all-link {
  font-weight: bold;
  text-decoration: none;
  color: #c2185b; /* Warna pink lebih tua */
  font-size: 0.9em;
}
.articles-grid {
  display: grid;
  /* Buat 4 kolom di layar besar, dan menyesuaikan ke bawah */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
}
</style>
