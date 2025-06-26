<template>
  <div class="page-container form-page">
    <h1>Reservasi Layanan</h1>
    <p>Amankan jadwal Anda untuk layanan premium kami. Pilih layanan, tanggal, dan waktu yang Anda inginkan.</p>
    
    <ReservationForm @submit="handleFormSubmit" :preselectedService="preselectedService" />

    <div v-if="submitStatus" :class="['submit-message', statusClass]">
      {{ submitStatus }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import ReservationForm from '@/components/forms/ReservationForm.vue';
import ApiService from '@/services/ApiService';

const route = useRoute();
const submitStatus = ref('');
const statusClass = ref('');

// Ambil nama layanan dari query URL
const preselectedService = ref(route.query.service || '');

const handleFormSubmit = async (formData) => {
  try {
    const response = await ApiService.submitReservation(formData);
    submitStatus.value = response.data.message;
    statusClass.value = 'success';
  } catch (error) {
    submitStatus.value = 'Gagal membuat reservasi. Silakan coba lagi.';
    statusClass.value = 'error';
  }
};
</script>

<style scoped>
/* Style Anda di sini tidak perlu diubah */
.page-container { max-width: 1100px; margin: 40px auto; padding: 0 20px; }
.form-page { max-width: 600px; text-align: center; }
.submit-message { margin-top: 20px; padding: 15px; border-radius: 8px; }
.success { background-color: #e6fffa; color: #2c5282; }
.error { background-color: #fff5f5; color: #c53030; }
</style>