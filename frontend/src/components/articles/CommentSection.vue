// CommentSection.vue
<template>
  <section class="comment-section">
    <h3 class="section-title">Komentar ({{ comments.length }})</h3>
    
    <!-- Daftar Komentar -->
    <div class="comment-list" v-if="comments.length > 0">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-avatar">
          <span>{{ comment.User.name.charAt(0).toUpperCase() }}</span>
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <strong>{{ comment.User.name }}</strong>
            <small>{{ formatDate(comment.createdAt) }}</small>
          </div>
          <p>{{ comment.content }}</p>
        </div>
        <!-- Tombol Hapus hanya untuk Admin -->
        <button v-if="isAdmin" @click="handleDelete(comment.id)" class="delete-btn" title="Hapus Komentar">
          &times;
        </button>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
    </div>

    <!-- Form Komentar (hanya jika sudah login) -->
    <div v-if="isLoggedIn" class="comment-form">
      <textarea v-model="newComment" placeholder="Tulis komentar Anda..."></textarea>
      <AppButton @click="handleSubmit" :disabled="!newComment.trim()">Kirim</AppButton>
    </div>
    <div v-else class="login-prompt">
      <p><router-link to="/login">Masuk</router-link> untuk meninggalkan komentar.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ApiService from '@/services/ApiService';
import { formatDate } from '@/utils/formatDate';
import AppButton from '@/components/common/AppButton.vue';

const route = useRoute();
const store = useStore();

const comments = ref([]);
const newComment = ref('');
const articleId = computed(() => route.params.id);

// Cek status login dan role admin dari Vuex
const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);

// Mengambil komentar dari API
const fetchComments = async () => {
  try {
    const response = await ApiService.getComments(articleId.value);
    comments.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil komentar:", error);
  }
};

// Mengirim komentar baru
const handleSubmit = async () => {
  if (!newComment.value.trim()) return;
  try {
    const response = await ApiService.createComment(articleId.value, { content: newComment.value });
    comments.value.push(response.data); // Tambahkan komentar baru ke daftar
    newComment.value = ''; // Kosongkan textarea
  } catch (error) {
    console.error("Gagal mengirim komentar:", error);
    alert("Gagal mengirim komentar. Silakan coba lagi.");
  }
};

// Menghapus komentar (hanya admin)
const handleDelete = async (commentId) => {
  if (confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
    try {
      await ApiService.deleteComment(articleId.value, commentId);
      // Hapus komentar dari daftar di frontend
      comments.value = comments.value.filter(c => c.id !== commentId);
    } catch (error) {
      console.error("Gagal menghapus komentar:", error);
      alert("Gagal menghapus komentar.");
    }
  }
};

onMounted(fetchComments);
</script>

<style scoped>
.comment-section {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}
.section-title {
  font-size: 1.5em;
  margin-bottom: 20px;
}
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.comment-item {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}
.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fce4ec;
  color: #c2185b;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.comment-content {
  flex-grow: 1;
}
.comment-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 5px;
}
.comment-header small {
  font-size: 0.8em;
  color: #999;
}
.comment-content p {
  margin: 0;
  line-height: 1.6;
}
.delete-btn {
  background: transparent;
  border: none;
  color: #aaa;
  font-size: 1.5em;
  cursor: pointer;
  padding: 0 5px;
  transition: color 0.2s;
}
.delete-btn:hover {
  color: #d32f2f;
}
.empty-state, .login-prompt {
  text-align: center;
  padding: 20px;
  color: #888;
  background-color: #f9f9f9;
  border-radius: 8px;
}
.login-prompt a {
  color: #c2185b;
  font-weight: bold;
}
.comment-form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.comment-form textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
}
.comment-form button {
  align-self: flex-end;
}
</style>
