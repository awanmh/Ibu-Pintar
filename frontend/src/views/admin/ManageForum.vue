<!-- src/views/admin/ManageForum.vue -->
<template>
  <div class="admin-section">
    <h2>Manajemen Forum (Tanya Bidan)</h2>

    <div v-if="loading">Memuat data...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="questions.length">
      <thead>
        <tr>
          <th>Pertanyaan</th>
          <th>Penanya</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="q in questions" :key="q.id">
          <td>{{ q.title }}</td>
          <td>{{ q.asker?.name || 'Anonim' }}</td>
          <td>
            <button @click="openAnswerModal(q)">Jawab</button>
            <button @click="deleteQuestion(q.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Komponen Modal Jawaban -->
    <AnswerModal
      v-if="selectedQuestion"
      :question="selectedQuestion"
      @close="selectedQuestion = null"
      @answered="fetchQuestions"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApiService from '@/services/ApiService';
import AnswerModal from '@/views/admin/AnswerModal.vue';

const questions = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedQuestion = ref(null);

const fetchQuestions = async () => {
  loading.value = true;
  try {
    const res = await ApiService.getAllQuestions();
    questions.value = res.data;
  } catch (err) {
    error.value = 'Gagal memuat forum';
  } finally {
    loading.value = false;
  }
};

const deleteQuestion = async (id) => {
  if (!confirm('Yakin ingin menghapus pertanyaan ini?')) return;
  try {
    await ApiService.deleteQuestion(id);
    questions.value = questions.value.filter(q => q.id !== id);
  } catch (err) {
    alert('Gagal menghapus pertanyaan');
  }
};

const openAnswerModal = (question) => {
  selectedQuestion.value = question;
};

onMounted(fetchQuestions);
</script>

<style scoped>
.admin-section {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
.error {
  color: red;
  margin-bottom: 1em;
}
</style>
