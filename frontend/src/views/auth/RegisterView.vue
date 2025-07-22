<template>
  <div class="auth-page">
    <div class="form-container">
      <h2>Daftar Akun Baru</h2>
      <p>Bergabunglah dengan komunitas Ibu Pintar untuk bertanya dan berdiskusi.</p>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Nama Lengkap</label>
          <input type="text" v-model="name" id="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required>
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <AppButton type="submit" :disabled="isLoading">
          {{ isLoading ? 'Mendaftar...' : 'Daftar' }}
        </AppButton>
      </form>
      <p class="switch-form">
        Sudah punya akun? <router-link to="/login">Masuk di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
// ### PERBAIKAN DI SINI: 'computed' ditambahkan ke import ###
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppButton from '@/components/common/AppButton.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);

const store = useStore();
const router = useRouter();

const isLoading = computed(() => store.getters['auth/authStatus'] === 'loading');

const handleRegister = async () => {
  error.value = null;
  try {
    await store.dispatch('auth/register', { name: name.value, email: email.value, password: password.value });
    router.push('/'); // Arahkan ke beranda setelah berhasil
  } catch (err) {
    error.value = err.response?.data?.message || 'Terjadi kesalahan saat registrasi.';
  }
};
</script>

<style scoped>
.auth-page { display: flex; justify-content: center; align-items: center; padding: 50px 20px; background-color: #f8f9fa; min-height: 80vh; }
.form-container { width: 100%; max-width: 420px; background: white; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-radius: 16px; text-align: center; }
.form-container h2 { margin-bottom: 10px; }
.form-container p { margin-bottom: 30px; color: #6c757d; }
.form-group { margin-bottom: 20px; text-align: left; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 600; }
.form-group input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 8px; }
.error-message { color: red; margin-bottom: 15px; }
.switch-form { margin-top: 20px; text-align: center; font-size: 0.9em; }
</style>
