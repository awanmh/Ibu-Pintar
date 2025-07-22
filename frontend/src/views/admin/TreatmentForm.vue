// admin/TreatmentForm.vue
<template>
  <div class="form-container">
    <h2>{{ isEdit ? 'Edit Treatment' : 'Tambah Treatment' }}</h2>
    <form @submit.prevent="handleSubmit" class="form" enctype="multipart/form-data">
      <div class="form-group">
        <label>Nama Treatment</label>
        <input v-model="form.name" type="text" required />
      </div>
      <div class="form-group">
        <label for="type">Tipe Treatment</label>
        <select v-model="form.type">
        <option value="single">Single</option>
        <option value="package">Package</option>
        </select>
      </div>
      <div class="form-group">
        <label>Gambar</label>
        <input type="file" @change="handleFileChange" accept="image/*" />
        <img v-if="previewImage" :src="previewImage" alt="Preview" class="preview" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Durasi</label>
          <input v-model="form.duration" type="text" />
        </div>

        <div class="form-group">
          <label>Kategori</label>
          <input v-model="form.category" type="text" />
        </div>
      </div>

      <div class="form-group">
        <label>Deskripsi</label>
        <textarea v-model="form.description" rows="4"></textarea>
      </div>

      <div class="form-group">
        <label>Harga (Rp)</label>
        <input v-model.number="form.price" type="number" min="0" required />
      </div>

      <div class="form-actions">
        <button type="submit">{{ isEdit ? 'Perbarui' : 'Simpan' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';

const route = useRoute();
const router = useRouter();

const isEdit = route.name === 'EditTreatment';
const form = ref({
  name: '',
  duration: '',
  category: '',
  description: '',
  price: 0
});
const imageFile = ref(null);
const previewImage = ref(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

onMounted(async () => {
  if (isEdit) {
    const { data } = await ApiService.getTreatmentById(route.params.id);
    form.value = data;
    previewImage.value = data.imageUrl || ''; // Ganti jika field berbeda
  }
});

const handleSubmit = async () => {
  const formData = new FormData();
  for (const key in form.value) {
    formData.append(key, form.value[key]);
  }
  if (imageFile.value) {
    formData.append('image', imageFile.value);
  }

  if (isEdit) {
    await ApiService.updateTreatment(route.params.id, formData);
  } else {
    await ApiService.createTreatment(formData);
  }

  router.push('/admin/treatments');
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

label {
  margin-bottom: 6px;
  font-weight: 500;
  color: #444;
}

input,
textarea {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

input:focus,
textarea:focus {
  border-color: #409eff;
  outline: none;
}

.preview {
  margin-top: 8px;
  max-width: 100%;
  max-height: 150px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.form-actions {
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #307ec7;
}
</style>
