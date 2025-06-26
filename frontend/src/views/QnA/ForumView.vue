<template>
  <div class="page-container animate-fade-in">
    <!-- HEADER -->
    <div class="forum-header animate-slide-up">
      <h1>Forum Tanya Bidan</h1>
      <p>Punya pertanyaan seputar kehamilan? Ajukan di sini atau lihat pertanyaan dari ibu lainnya.</p>
      <router-link to="/tanya-bidan/tanya">
        <AppButton variant="primary">Ajukan Pertanyaan Baru</AppButton>
      </router-link>
    </div>

    <!-- LIST PERTANYAAN -->
    <div class="question-list">
      <div v-if="loading" class="loading">Memuat pertanyaan...</div>

      <div
        v-for="(question, index) in questions"
        :key="question.id"
        class="question-item animate-fade-in"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <div class="question-content">
          <router-link :to="`/tanya-bidan/${question.id}`" class="question-title">
            <h3>{{ question.title }}</h3>
          </router-link>
          <p class="question-meta">
            Ditanyakan oleh <strong>{{ question.asker.name }}</strong> pada {{ formatDate(question.createdAt) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApiService from '@/services/ApiService';
import AppButton from '@/components/common/AppButton.vue';
import { formatDate } from '@/utils/formatDate';

const questions = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await ApiService.getAllQuestions();
    questions.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil daftar pertanyaan:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* ==== ANIMASI ==== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}
.animate-slide-up {
  animation: slideUp 0.6s ease forwards;
  opacity: 0;
}

/* ==== PAGE CONTAINER ==== */
.page-container {
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px;
}

/* ==== HEADER ==== */
.forum-header {
  text-align: center;
  margin-bottom: 40px;
}
.forum-header h1 {
  font-size: 2.4em;
  color: #880e4f;
  margin-bottom: 10px;
}
.forum-header p {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 20px;
}

/* ==== DAFTAR PERTANYAAN ==== */
.question-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.loading {
  text-align: center;
  padding: 30px;
  font-size: 1.1em;
  color: #999;
}

/* ==== KARTU PERTANYAAN ==== */
.question-item {
  background: #fff;
  padding: 22px 24px;
  border: 1px solid #eee;
  border-radius: 12px;
  transition: transform 0.25s, box-shadow 0.25s;
}
.question-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

/* ==== TITLE & META ==== */
.question-title {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}
.question-title:hover {
  color: #c2185b;
}
.question-title h3 {
  font-size: 1.15em;
  margin: 0 0 5px;
}
.question-meta {
  font-size: 0.9em;
  color: #777;
}
</style>
