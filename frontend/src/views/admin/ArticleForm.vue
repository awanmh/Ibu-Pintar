<template>
  <div>
    <h1>{{ isEditing ? 'Edit Artikel' : 'Tambah Artikel Baru' }}</h1>
    <form @submit.prevent="handleSubmit" class="article-form">
      <div class="form-group">
        <label for="title">Judul Artikel</label>
        <input type="text" id="title" v-model="article.title" required>
      </div>

      <!-- ### BAGIAN BARU DITAMBAHKAN DI SINI ### -->
      <div class="form-group">
        <label for="author">Penulis</label>
        <!-- Input ini dinonaktifkan karena nama penulis diambil otomatis dari user yang login -->
        <input type="text" id="author" :value="authorName" readonly disabled>
      </div>

      <!-- Input untuk Upload Gambar -->
      <div class="form-group">
        <label for="imageUpload">Upload Gambar Sampul</label>
        <input type="file" id="imageUpload" @change="handleFileChange" accept="image/png, image/jpeg, image/jpg">
        
        <!-- Area Preview Gambar -->
        <div v-if="imagePreview" class="image-preview">
          <p>Preview Gambar Baru:</p>
          <img :src="imagePreview" alt="Preview Gambar">
        </div>
        <!-- Tampilkan gambar yang sudah ada saat mode edit -->
        <div v-else-if="isEditing && article.imageUrl" class="image-preview">
            <p>Gambar Saat Ini:</p>
            <img :src="`http://localhost:5000${article.imageUrl}`" alt="Gambar Artikel">
        </div>
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
        <textarea id="content" v-model="article.content" rows="15" required></textarea>
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

// ### LOGIKA BARU UNTUK NAMA PENULIS ###
const authorName = computed(() => store.getters['auth/currentUser']?.name || 'Admin');

// State baru untuk upload gambar
const selectedFile = ref(null);
const imagePreview = ref('');
const isUploading = ref(false);

// Fungsi untuk menangani pemilihan file
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    // Buat URL sementara untuk ditampilkan sebagai preview
    imagePreview.value = URL.createObjectURL(file);
  }
};

onMounted(async () => {
  // Ambil daftar kategori untuk dropdown
  try {
    const catResponse = await ApiService.getCategories();
    categories.value = catResponse.data;
  } catch (error) {
    console.error("Gagal mengambil kategori:", error);
  }

  // Jika ini mode edit, ambil data artikel yang ada
  if (isEditing.value) {
    try {
      const artResponse = await ApiService.getArticle(route.params.id);
      article.value = artResponse.data;
    } catch (error) {
      console.error("Gagal mengambil artikel untuk diedit:", error);
    }
  }
});

// Fungsi yang dijalankan saat form disubmit
const handleSubmit = async () => {
  isUploading.value = true;
  let imageUrl = article.value.imageUrl; // Simpan URL gambar yang sudah ada (untuk mode edit)

  // 1. Jika ada file baru yang dipilih, unggah dulu
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('image', selectedFile.value);
    try {
      const uploadResponse = await ApiService.uploadImage(formData);
      imageUrl = uploadResponse.data.imagePath; // Dapatkan path gambar baru dari backend
    } catch (error) {
      console.error("Gagal mengunggah gambar:", error);
      alert("Gagal mengunggah gambar. Pastikan file adalah gambar (jpg/png).");
      isUploading.value = false;
      return;
    }
  }

  // 2. Siapkan payload data artikel
  const author_id = store.getters['auth/currentUser']?.id;
  if (!author_id) {
    alert("Sesi admin tidak valid. Silakan login ulang.");
    isUploading.value = false;
    return;
  }
  const payload = { ...article.value, imageUrl, author_id };

  // 3. Kirim data artikel ke backend (create atau update)
  try {
    if (isEditing.value) {
      await ApiService.updateArticle(route.params.id, payload);
    } else {
      await ApiService.createArticle(payload);
    }
    // Arahkan kembali ke halaman manajemen artikel setelah berhasil
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
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
/* Style untuk input yang dinonaktifkan */
.form-group input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}
textarea {
  min-height: 250px;
  resize: vertical;
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
</style>
