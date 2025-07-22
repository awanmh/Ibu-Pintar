<template>
  <div class="page-container animate-fade-in" v-if="question">
    <!-- Bagian Pertanyaan Utama -->
    <div class="question-main animate-slide-up">
      <h1>{{ question.title }}</h1>
      <p class="meta">
        Ditanyakan oleh <strong>{{ question.asker.name }}</strong> pada {{ formatDate(question.createdAt) }}
      </p>
      <p class="content">{{ question.content }}</p>
    </div>

    <!-- Bagian Jawaban -->
    <div class="answers-section animate-fade-in delay-1">
      <h2>Jawaban ({{ question.answers.length }})</h2>
      <div
        v-for="(answer, index) in question.answers"
        :key="answer.id"
        class="answer-item animate-fade-in"
        :class="{'admin-answer': answer.author.role === 'admin'}"
        :style="{ animationDelay: `${0.2 + index * 0.1}s` }"
      >
        <p class="answer-content">💬 {{ answer.content }}</p>
        <p class="meta">
          Dijawab oleh 
          <strong>{{ answer.author.name }}</strong>
          <span v-if="answer.author.role === 'admin'" class="admin-badge"> (Bidan)</span>
          pada {{ formatDate(answer.createdAt) }}
        </p>
      </div>
    </div>

    <!-- Form Jawaban -->
    <div class="reply-form animate-slide-up delay-2">
      <h3>Beri Jawaban</h3>
      <form @submit.prevent="submitAnswer">
        <textarea v-model="newAnswer" rows="5" placeholder="Tulis jawaban Anda di sini..." required></textarea>
        <AppButton type="submit">Kirim Jawaban</AppButton>
      </form>
    </div>
  </div>

  <div v-else-if="loading" class="loading">Memuat...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '@/services/ApiService';
import AppButton from '@/components/common/AppButton.vue';
import { formatDate } from '@/utils/formatDate';

const route = useRoute();
const question = ref(null);
const newAnswer = ref('');
const loading = ref(true);

const fetchQuestion = async () => {
  try {
    const response = await ApiService.getQuestionById(route.params.id);
    question.value = response.data;
  } catch (error) {
    console.error('Gagal mengambil detail pertanyaan:', error);
  } finally {
    loading.value = false;
  }
};

const submitAnswer = async () => {
  try {
    const answerData = {
      content: newAnswer.value,
    };
    await ApiService.createAnswer(route.params.id, answerData);
    newAnswer.value = '';
    fetchQuestion(); // Refresh data
  } catch (error) {
    console.error('Gagal mengirim jawaban:', error);
  }
};

onMounted(fetchQuestion);
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
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
}
.animate-slide-up {
  animation: slideUp 0.6s ease forwards;
  opacity: 0;
}
.delay-1 { animation-delay: 0.3s; }
.delay-2 { animation-delay: 0.6s; }

/* ==== CONTAINER ==== */
.page-container {
  max-width: 850px;
  margin: 60px auto;
  padding: 0 20px;
}

/* ==== PERTANYAAN UTAMA ==== */
.question-main {
  background: #fff;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  margin-bottom: 40px;
}
.question-main h1 {
  font-size: 2em;
  margin-bottom: 10px;
  color: #880e4f;
}
.meta {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 15px;
}
.content {
  font-size: 1.1em;
  line-height: 1.8;
  color: #333;
}

/* ==== JAWABAN ==== */
.answers-section h2 {
  margin-bottom: 20px;
  color: #333;
}
.answer-item {
  background: #fafafa;
  padding: 20px;
  border-left: 4px solid #c2185b;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}
.answer-content {
  margin: 0 0 8px;
  font-size: 1em;
  color: #444;
}

/* ==== FORM JAWABAN ==== */
.reply-form {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  margin-top: 40px;
}
.reply-form h3 {
  margin-bottom: 20px;
}
textarea {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: vertical;
  transition: all 0.3s;
}
textarea:focus {
  border-color: #c2185b;
  box-shadow: 0 0 0 3px rgba(194, 24, 91, 0.15);
  outline: none;
}

/* ==== LOADING ==== */
.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
  color: #888;
}
</style>
