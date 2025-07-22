<template>
  <div class="page-container">
    <div class="form-card animate-fade-in">
      <h1 class="title animate-slide-up">Ajukan Pertanyaan Baru 🩺</h1>
      <p class="subtitle animate-slide-up delay-1">
        Tanyakan apa saja seputar kehamilan, bayi, dan kesehatan ibu. Pertanyaan Anda bisa membantu orang lain juga!
      </p>

      <form @submit.prevent="submitQuestion" class="form animate-fade-in delay-2">
        <div class="form-group">
          <label for="title">Judul Pertanyaan</label>
          <input
            type="text"
            id="title"
            v-model="newQuestion.title"
            required
            placeholder="Contoh: Apakah demam setelah vaksin normal?" />
        </div>

        <div class="form-group">
          <label for="content">Isi Pertanyaan</label>
          <textarea
            id="content"
            v-model="newQuestion.content"
            rows="6"
            required
            placeholder="Tuliskan gejala, usia bayi, atau hal yang membuat Anda khawatir..."></textarea>
        </div>

        <AppButton type="submit" variant="primary" class="submit-btn">
          Kirim Pertanyaan 💬
        </AppButton>
      </form>

      <!-- Notifikasi -->
      <transition name="fade">
        <div v-if="notif.message" :class="['notif', notif.type]">
          {{ notif.message }}
        </div>
      </transition>
    </div>
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
});

const notif = ref({ message: '', type: '' });

const submitQuestion = async () => {
  try {
    await ApiService.createQuestion(newQuestion.value);
    notif.value.message = '✅ Pertanyaan berhasil dikirim!';
    notif.value.type = 'success';
    newQuestion.value.title = '';
    newQuestion.value.content = '';

    setTimeout(() => {
      router.push('/tanya-bidan');
    }, 2000);
  } catch (err) {
    notif.value.message = '❌ Gagal mengirim pertanyaan. Coba lagi.';
    notif.value.type = 'error';
  }
};
</script>

<style scoped>
/* Animasi */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
}
.animate-slide-up {
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
}
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

/* Layout */
.page-container {
  max-width: 800px;
  margin: 60px auto;
  padding: 0 20px;
}

.form-card {
  background-color: #fff;
  padding: 40px 30px;
  border-radius: 14px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  text-align: left;
}

.title {
  font-size: 2.2em;
  font-weight: bold;
  margin-bottom: 10px;
  color: #880e4f;
}

.subtitle {
  font-size: 1.05em;
  color: #555;
  margin-bottom: 30px;
}

/* Form */
.form-group {
  margin-bottom: 25px;
}
label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
}
input,
textarea {
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1em;
  transition: border 0.3s ease;
}
input:focus,
textarea:focus {
  border-color: #c2185b;
  outline: none;
  box-shadow: 0 0 0 2px rgba(194, 24, 91, 0.2);
}

/* Button */
.submit-btn {
  margin-top: 10px;
  padding: 12px 30px;
  font-size: 1em;
  border-radius: 10px;
}

/* Notification */
.notif {
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
}
.success {
  background-color: #e6fffa;
  color: #2f855a;
}
.error {
  background-color: #fff5f5;
  color: #c53030;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
