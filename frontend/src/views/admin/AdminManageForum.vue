<template>
  <div class="page-container">
    <h1>Manajemen Tanya Bidan</h1>
    <div v-for="q in questions" :key="q.id" class="question-box">
      <h3>{{ q.title }}</h3>
      <p>{{ q.content }}</p>
      <router-link :to="`/tanya-bidan/${q.id}`">
        <AppButton>Lihat & Jawab</AppButton>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApiService from '@/services/ApiService';

const questions = ref([]);

onMounted(async () => {
  const res = await ApiService.getAllQuestions();
  questions.value = res.data.filter(q => q.Answers.length === 0); // Belum dijawab
});
</script>

<style scoped>
.question-box {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 16px;
  border-radius: 10px;
}
</style>
