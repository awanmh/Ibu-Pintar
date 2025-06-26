<template>
  <div class="page-container form-page">
    <h1>Konsultasi Online</h1>
    <p>Punya pertanyaan? Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.</p>
    
    <ConsultationForm @submit="handleFormSubmit" />

    <div v-if="submitStatus" :class="['submit-message', statusClass]">
      {{ submitStatus }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ConsultationForm from '@/components/forms/ConsultationForm.vue';
import ApiService from '@/services/ApiService';

const submitStatus = ref('');
const statusClass = ref('');

const handleFormSubmit = async (formData) => {
  try {
    const response = await ApiService.submitConsultation(formData);
    submitStatus.value = response.data.message;
    statusClass.value = 'success';
  } catch (error) {
    submitStatus.value = 'Gagal mengirim form. Silakan coba lagi.';
    statusClass.value = 'error';
  }
};
</script>

<style scoped>
.form-page {
  max-width: 600px;
  text-align: center;
}
.submit-message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
}
.success {
  background-color: #e6fffa;
  color: #2c5282;
}
.error {
  background-color: #fff5f5;
  color: #c53030;
}
</style>