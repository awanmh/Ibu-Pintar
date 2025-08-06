//ArticleForm.vue
<template>
  <div>
    <h1>{{ isEditing ? 'Edit Artikel' : 'Tambah Artikel Baru' }}</h1>
    <form @submit.prevent="handleSubmit" class="article-form">
      <div class="form-group">
        <label for="title">Judul Artikel</label>
        <input type="text" id="title" v-model="article.title" required>
      </div>

      <div class="form-group">
        <label for="author">Penulis</label>
        <input type="text" id="author" :value="authorName" readonly disabled>
      </div>

      <div class="form-group">
        <label for="imageUpload">Upload Gambar Sampul</label>
        <input type="file" id="imageUpload" @change="handleFileChange" accept="image/png, image/jpeg, image/jpg">
        
        <div v-if="imagePreview" class="image-preview">
          <p>Preview Gambar Baru:</p>
          <img :src="imagePreview" alt="Preview Gambar">
        </div>
        <!-- ========================================================== -->
        <!-- PERBAIKAN DI SINI: Hapus prefix localhost -->
        <!-- ========================================================== -->
        <div v-else-if="isEditing && article.imageUrl" class="image-preview">
            <p>Gambar Saat Ini:</p>
            <img :src="article.imageUrl" alt="Gambar Artikel">
        </div>
        <!-- ========================================================== -->
      </div>
      
      <div class="form-group">
        <label for="category">Kategori</label>
        <select id="category" v-model="article.category_id" required>
          <option disabled value="">Pilih kategori...</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="content">Konten</label>
        <QuillEditor 
          theme="snow" 
          toolbar="full" 
          v-model:content="article.content" 
          contentType="html"
          style="min-height: 250px;"
        />
      </div>

      <AppButton type="submit" variant="primary" :disabled="isUploading">
        {{ isUploading ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Publikasikan Artikel') }}
      </AppButton>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ApiService from '@/services/ApiService';
import AppButton from '@/components/common/AppButton.vue';

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();
const router = useRouter();
const store = useStore();

const article = ref({
  title: '',
  content: '',
  imageUrl: '',
  category_id: '',
});
const categories = ref([]);
const isEditing = computed(() => !!route.params.id);
const authorName = computed(() => store.getters['auth/currentUser']?.name || 'Admin');
const selectedFile = ref(null);
const imagePreview = ref('');
const isUploading = ref(false);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

onMounted(async () => {
  try {
    const catResponse = await ApiService.getCategories();
    categories.value = catResponse.data;
  } catch (error) {
    console.error("Gagal mengambil kategori:", error);
  }

  if (isEditing.value) {
    try {
      const artResponse = await ApiService.getArticle(route.params.id);
      article.value = artResponse.data;
    } catch (error) {
      console.error("Gagal mengambil artikel untuk diedit:", error);
    }
  }
});

const handleSubmit = async () => {
  isUploading.value = true;
  
  const formData = new FormData();
  formData.append('title', article.value.title);
  formData.append('content', article.value.content);
  formData.append('category_id', article.value.category_id);
  
  const author_id = store.getters['auth/currentUser']?.id;
  if (!author_id) {
    alert("Sesi admin tidak valid. Silakan login ulang.");
    isUploading.value = false;
    return;
  }
  formData.append('author_id', author_id);

  if (selectedFile.value) {
    formData.append('image', selectedFile.value);
  }

  try {
    if (isEditing.value) {
      await ApiService.updateArticle(route.params.id, formData);
    } else {
      await ApiService.createArticle(formData);
    }
    router.push('/admin/articles');
  } catch (error) {
    console.error("Gagal menyimpan artikel:", error);
    alert("Terjadi kesalahan saat menyimpan artikel.");
  } finally {
    isUploading.value = false;
  }
};
</script>

<style scoped>
.article-form {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.form-group input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}
.image-preview {
  margin-top: 15px;
  border: 1px dashed #ccc;
  padding: 10px;
  border-radius: 8px;
}
.image-preview img {
  max-width: 250px;
  height: auto;
  border-radius: 4px;
  display: block;
}

/* Styling untuk Quill Editor agar menyatu dengan form */
.form-group :deep(.ql-toolbar) {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.form-group :deep(.ql-container) {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
