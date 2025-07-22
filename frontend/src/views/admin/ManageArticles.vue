<template>
  <div>
    <div class="page-header">
      <h1>Manajemen Artikel</h1>
      <router-link to="/admin/articles/new">
        <AppButton variant="primary">Tambah Artikel Baru</AppButton>
      </router-link>
    </div>

    <table>
      <thead>
        <tr>
          <th>Judul</th>
          <th>Kategori</th>
          <th>Penulis</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.category?.name || 'N/A' }}</td>
          <td>{{ article.author?.name || 'N/A' }}</td>
          <td class="actions">
            <router-link :to="`/admin/articles/edit/${article.id}`">
              <AppButton variant="secondary" size="small">Edit</AppButton>
            </router-link>
            <AppButton 
              variant="danger" 
              size="small" 
              @click="handleDelete(article.id)"
            >
              Hapus
            </AppButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApiService from '@/services/ApiService';
import AppButton from '@/components/common/AppButton.vue';

const articles = ref([]);

onMounted(async () => {
  try {
    const response = await ApiService.getArticles();
    articles.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil artikel:", error);
  }
});

const handleDelete = async (id) => {
  if (confirm("Yakin ingin menghapus artikel ini?")) {
    try {
      await ApiService.deleteArticle(id); // pastikan endpoint ini tersedia
      articles.value = articles.value.filter(article => article.id !== id);
    } catch (error) {
      alert("Gagal menghapus artikel.");
      console.error(error);
    }
  }
};
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}
th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
th {
  background-color: #f9f9f9;
}
.actions {
  display: flex;
  gap: 8px;
}
</style>
