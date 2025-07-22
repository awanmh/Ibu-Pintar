<template>
  <div class="auth-page">
    <div class="form-container">
      <h2>Selamat Datang Kembali</h2>
      <p>Masuk untuk melanjutkan aktivitas Anda di Ibu Pintar.</p>

      <!-- Form Login Manual -->
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div v-if="error" class="error-message">{{ error }}</div>
        <AppButton type="submit" :disabled="isLoading">
          {{ isLoading ? 'Masuk...' : 'Login' }}
        </AppButton>
      </form>

      <p class="switch-form">
        Belum punya akun? <router-link to="/register">Daftar sekarang</router-link>
      </p>

      <hr style="margin: 30px 0" />

      <!-- Tombol Google Sign-In -->
      <div class="google-login">
        <div
          id="g_id_onload"
          data-client_id="922035780127-rqc8q5lebeq3l85c720ikc1c6dfv9mbe.apps.googleusercontent.com"
          data-context="signin"
          data-callback="handleGoogleCredentialResponse"
          data-auto_prompt="false"
        ></div>

        <div
          class="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppButton from '@/components/common/AppButton.vue';

const email = ref('');
const password = ref('');
const error = ref(null);

const store = useStore();
const router = useRouter();

const isLoading = computed(() => store.getters['auth/authStatus'] === 'loading');

// Login Manual
const handleLogin = async () => {
  error.value = null;
  try {
    await store.dispatch('auth/login', { email: email.value, password: password.value });
    router.push('/');
  } catch (err) {
    error.value = err.response?.data?.message || 'Terjadi kesalahan saat login.';
  }
};

// Login Google
const handleGoogleCredentialResponse = async (response) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login Google gagal.');

    localStorage.setItem('token', data.token);
    // dispatch Vuex jika ada: await store.dispatch('auth/setUserFromToken', data.token);
    router.push('/');
  } catch (err) {
    error.value = err.message;
  }
};

// Dibuat global agar SDK Google bisa panggil
window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  background-color: #f8f9fa;
  min-height: 80vh;
}
.form-container {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  text-align: center;
}
.form-container h2 {
  margin-bottom: 10px;
}
.form-container p {
  margin-bottom: 30px;
  color: #6c757d;
}
.form-group {
  margin-bottom: 20px;
  text-align: left;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
}
.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.error-message {
  color: red;
  margin-bottom: 15px;
}
.switch-form {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9em;
}
.google-login {
  display: flex;
  justify-content: center;
}
</style>
