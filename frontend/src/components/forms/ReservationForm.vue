<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="form-group">
      <label for="res-name">Nama Lengkap</label>
      <input type="text" id="res-name" v-model="formData.name" required>
    </div>
    <div class="form-group">
      <label for="res-email">Alamat Email</label>
      <input type="email" id="res-email" v-model="formData.email" required>
    </div>
     <div class="form-group">
      <label for="res-phone">Nomor Telepon</label>
      <input type="tel" id="res-phone" v-model="formData.phone" placeholder="Contoh: 08123456789" required>
    </div>

    <div class="form-group">
      <label for="res-service">Pilih Layanan</label>
      <input v-if="preselectedService" type="text" id="res-service" :value="preselectedService" readonly class="readonly-input">
      <select v-else id="res-service" v-model="formData.service_type" required>
        <option disabled value="">-- Silakan pilih layanan --</option>
        <option value="yoga_prenatal">Yoga Prenatal</option>
        <option value="pijat_bayi">Pijat Bayi</option>
      </select>
    </div>

    <div class="form-group-row">
      <div class="form-group">
        <label for="res-date">Pilih Tanggal</label>
        <input type="date" id="res-date" v-model="formData.date" :min="today" required>
      </div>
      <div class="form-group">
        <label for="res-time">Pilih Jam</label>
        <input type="time" id="res-time" v-model="formData.time" required>
      </div>
    </div>
    <AppButton type="submit" variant="primary">Buat Jadwal Reservasi</AppButton>
  </form>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import AppButton from '@/components/common/AppButton.vue';

// Terima prop dari parent
const props = defineProps({
  preselectedService: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['submit']);

const formData = ref({
  name: '',
  email: '',
  phone: '',
  service_type: '', // Dikosongkan dulu
  date: '',
  time: '',
});

// Gunakan watchEffect untuk mengisi service_type saat prop berubah
watchEffect(() => {
  if (props.preselectedService) {
    formData.value.service_type = props.preselectedService;
  }
});

const today = new Date().toISOString().split('T')[0];

const handleSubmit = () => {
  emit('submit', formData.value);
};
</script>

<style scoped>
/* Style Anda di sini tidak perlu diubah, tambahkan ini untuk input readonly */
.readonly-input {
  background-color: #f0f0f0;
  cursor: not-allowed;
}
/* ... sisa style Anda ... */
.form-container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 20px; }
.form-group-row { display: flex; gap: 20px; margin-bottom: 20px; }
.form-group-row .form-group { flex: 1; margin-bottom: 0; }
.form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #333; }
.form-group input, .form-group textarea, .form-group select { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px; box-sizing: border-box; font-family: inherit; font-size: 1rem; }
</style>