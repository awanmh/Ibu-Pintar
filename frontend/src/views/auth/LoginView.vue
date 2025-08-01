<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Login</h1>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required minlength="6" />
        </div>

        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <div class="separator">
        <span>atau</span>
      </div>

      <div id="g_id_onload"
           data-client_id="922035780127-rqc8q5lebeq3l85c720ikc1c6dfv9mbe.apps.googleusercontent.com"
           data-callback="handleGoogleCredentialResponse"
           data-auto_prompt="false">
      </div>
      <div class="g_id_signin"
           data-type="standard"
           data-size="large"
           data-theme="outline"
           data-text="sign_in_with"
           data-shape="rectangular"
           data-logo_alignment="left">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';

const email = ref('');
const password = ref('');
const error = ref('');

const store = useStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    error.value = '';
    await store.dispatch('auth/login', { email: email.value, password: password.value });

    const role = store.getters['auth/currentUser']?.role;
    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'visitor') {
      router.push('/');
    } else {
      router.push('/login');
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login gagal.';
  }
};

const handleGoogleCredentialResponse = async (response) => {
  try {
    // 2. Ganti seluruh isi fungsi ini
    const { data } = await ApiService.googleLogin({ credential: response.credential });

    // Simpan data user dan token ke local storage dan Vuex
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', data.token);
    store.commit('auth/AUTH_SUCCESS', { user: data, token: data.token });

    // Arahkan ke halaman yang sesuai
    if (data.role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login Google gagal.';
  }
};

onMounted(() => {
  // Cegah akses ke halaman login jika sudah login
  if (store.getters['auth/isLoggedIn']) {
    const role = store.getters['auth/currentUser']?.role;
    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/');
    }
  }

  // Daftarkan callback Google
  window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;

  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  width: 350px;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: .5rem;
}

input {
  width: 100%;
  padding: .5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: .75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.separator {
  text-align: center;
  margin: 1rem 0;
}

.separator span {
  background: white;
  padding: 0 10px;
  color: #888;
}

.error {
  color: red;
  margin-top: .5rem;
  text-align: center;
}
</style>
