<template>
  <div class="page-container form-page animate-fade-in">
    <h1 class="form-title animate-slide-up">Ajukan Pertanyaan Baru</h1>
    <p class="form-sub animate-slide-up delay-1">
      Tulis pertanyaan Anda dengan jelas dan detail agar mudah dijawab oleh bidan atau member lainnya.
    </p>
    <form @submit.prevent="submitQuestion" class="form-container animate-fade-in delay-2">
      <div class="form-group">
        <label for="title">Judul Pertanyaan</label>
        <input type="text" id="title" v-model="newQuestion.title" required placeholder="Contoh: Apakah demam setelah vaksin normal?" />
      </div>
      <div class="form-group">
        <label for="content">Isi Pertanyaan</label>
        <textarea id="content" v-model="newQuestion.content" rows="8" required placeholder="Tuliskan gejala, usia bayi, dan informasi lainnya secara lengkap..."></textarea>
      </div>
      <AppButton type="submit">💬 Kirim Pertanyaan</AppButton>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import AppButton from '@/components/common/AppButton.vue';

const router = useRouter();
const newQuestion = ref({
  title: '',
  content: '',
  user_id: 2, // Ganti dengan user ID yang sedang login
});

const submitQuestion = async () => {
  try {
    await ApiService.createQuestion(newQuestion.value);
    router.push('/tanya-bidan');
  } catch (error) {
    console.error('Gagal mengirim pertanyaan:', error);
  }
};
</script>

<style scoped>
/* ==== ANIMASI ==== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
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
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

/* ==== FORM PAGE ==== */
.form-page {
  max-width: 700px;
  margin: 60px auto;
  text-align: center;
  padding: 0 20px;
}
.form-title {
  font-size: 2.5em;
  font-weight: bold;
  color: #880e4f;
}
.form-sub {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 30px;
}

/* ==== FORM CONTAINER ==== */
.form-container {
  background: #fff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
  text-align: left;
}
.form-group {
  margin-bottom: 25px;
}
label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
}
input[type="text"],
textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1em;
  transition: border 0.3s, box-shadow 0.3s;
}
input:focus,
textarea:focus {
  border-color: #c2185b;
  box-shadow: 0 0 0 3px rgba(194, 24, 91, 0.15);
  outline: none;
}

/* Placeholder style (opsional) */
input::placeholder,
textarea::placeholder {
  color: #aaa;
  font-style: italic;
}
</style>
