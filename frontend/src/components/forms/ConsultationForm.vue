<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="form-group">
      <label for="name">Nama Lengkap</label>
      <input type="text" id="name" v-model="formData.name" required>
    </div>
    <div class="form-group">
      <label for="email">Alamat Email</label>
      <input type="email" id="email" v-model="formData.email" required>
    </div>
    <div class="form-group">
      <label for="topic">Topik Konsultasi</label>
      <input type="text" id="topic" v-model="formData.topic" required>
    </div>
    <div class="form-group">
      <label for="message">Pesan Anda</label>
      <textarea id="message" v-model="formData.message" rows="5" required></textarea>
    </div>
    <AppButton type="submit" variant="primary">Kirim Konsultasi</AppButton>
  </form>
</template>

<script>
import AppButton from '@/components/common/AppButton.vue';

export default {
  name: 'ConsultationForm',
  components: { AppButton },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        topic: '',
        message: '',
      },
    };
  },
  emits: ['submit'],
  methods: {
    handleSubmit() {
      // Kirim data form ke komponen parent
      this.$emit('submit', this.formData);
    },
  },
};
</script>

<style scoped>
.form-container {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box; /* Penting agar padding tidak menambah width */
}
</style>