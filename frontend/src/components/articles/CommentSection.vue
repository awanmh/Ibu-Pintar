<template>
  <div class="comment-section">
    <h3 class="section-title">Komentar ({{ comments.length }})</h3>
    
    <!-- Form untuk Menulis Komentar Baru -->
    <form @submit.prevent="addComment" class="comment-form">
      <textarea v-model="newComment" placeholder="Tulis komentar Anda..." rows="4" required></textarea>
      <AppButton type="submit">Kirim</AppButton>
    </form>

    <!-- Daftar Komentar yang Sudah Ada -->
    <div class="comment-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-avatar">
          <span>{{ comment.author.charAt(0) }}</span>
        </div>
        <div class="comment-content">
          <p class="comment-author">{{ comment.author }}</p>
          <p class="comment-text">{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppButton from '@/components/common/AppButton.vue';

// Data dummy untuk komentar
const comments = ref([
  { id: 1, author: 'Rina Pengunjung', text: 'Artikelnya sangat bermanfaat, terima kasih banyak!' },
  { id: 2, author: 'Budi Setiawan', text: 'Informasi yang sangat saya butuhkan saat ini.' },
]);

const newComment = ref('');

const addComment = () => {
  if (newComment.value.trim() === '') return;
  comments.value.unshift({
    id: Date.now(),
    author: 'Anda', // Ganti dengan nama user yang login nanti
    text: newComment.value,
  });
  newComment.value = '';
};
</script>

<style scoped>
.comment-section {
  margin-top: 50px;
}
.section-title {
  font-size: 1.6em;
  margin-bottom: 25px;
}
.comment-form {
  margin-bottom: 40px;
}
.comment-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
}
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.comment-item {
  display: flex;
  gap: 15px;
}
.comment-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ff69b4;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: bold;
  flex-shrink: 0;
}
.comment-author {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
