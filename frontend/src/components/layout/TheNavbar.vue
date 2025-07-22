<template>
  <header 
    class="navbar animate-fade-in" 
    :class="{ 'navbar-hidden': isHidden }"
  >
    <div class="container">
      <div class="brand">
        <router-link to="/" class="brand-link">
          <img src="@/assets/images/logo.jpg" alt="Ibu Pintar Logo" class="logo-image" />
        </router-link>
      </div>
      
      <nav class="nav-links">
        <router-link to="/">Beranda</router-link>
        <router-link to="/articles">Artikel</router-link>
        <router-link to="/layanan">Layanan</router-link>
        <router-link to="/tanya-bidan">Tanya Bidan</router-link>
        <router-link to="/about">Tentang Kami</router-link>
      </nav>

      <div class="navbar-actions">
        <!-- Tampilan untuk pengguna yang sudah login -->
        <div v-if="isLoggedIn && user" class="user-menu" ref="userMenuRef">
          <button @click="toggleDropdown" class="avatar-btn">
            <!-- Tampilkan huruf pertama dari nama user -->
            <span>{{ user.name.charAt(0) }}</span>
          </button>
          
          <!-- Menu Dropdown -->
          <transition name="dropdown-fade">
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <div class="dropdown-header">
                <strong>{{ user.name }}</strong>
                <small>{{ user.email }}</small>
              </div>
              <router-link v-if="isAdmin" to="/admin" class="dropdown-item">
                Dashboard Admin
              </router-link>
              <a @click="handleLogout" class="dropdown-item logout-item">
                Logout
              </a>
            </div>
          </transition>
        </div>

        <!-- Tampilan untuk tamu (belum login) -->
        <div v-else class="guest-menu">
          <router-link to="/login">
            <AppButton variant="secondary">Masuk</AppButton>
          </router-link>
          <router-link to="/register">
            <AppButton variant="primary">Daftar</AppButton>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppButton from '@/components/common/AppButton.vue';

// --- LOGIKA OTENTIKASI ---
const store = useStore();
const router = useRouter();

const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
const user = computed(() => store.getters['auth/currentUser']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);

const handleLogout = () => {
  isDropdownOpen.value = false; // Tutup dropdown saat logout
  store.dispatch('auth/logout');
  router.push('/login');
};

// --- LOGIKA DROPDOWN ---
const isDropdownOpen = ref(false);
const userMenuRef = ref(null);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

// --- LOGIKA SCROLL NAVBAR ---
const isHidden = ref(false);
let lastScrollY = window.scrollY;

const handleScroll = () => {
  const currentScroll = window.scrollY;
  isHidden.value = currentScroll > lastScrollY && currentScroll > 80;
  lastScrollY = currentScroll <= 0 ? 0 : currentScroll;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', closeDropdown); // Tambahkan event listener untuk klik di luar
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', closeDropdown); // Hapus event listener saat komponen dihancurkan
});
</script>

<style scoped>
/* Style utama navbar tidak berubah, hanya menambahkan style untuk user menu */
.navbar { background-color: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04); padding: 15px 0; position: sticky; top: 0; z-index: 1000; transition: transform 0.4s ease-in-out; }
.navbar-hidden { transform: translateY(-100%); }
.container { max-width: 1300px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
.brand { justify-self: start; }
.logo-image { height: 50px; }
.nav-links { justify-self: center; display: flex; align-items: center; gap: 35px; }
.nav-links a { font-weight: 600; position: relative; padding: 6px 0; color: #444; text-decoration: none; transition: all 0.3s ease; }
.nav-links a:hover { color: #c2185b; }
.router-link-exact-active { color: #c2185b; font-weight: 700; }

/* ### STYLE BARU UNTUK USER MENU & DROPDOWN ### */
.navbar-actions {
  justify-self: end;
  display: flex;
  align-items: center;
  min-width: 160px;
  justify-content: flex-end;
}
.user-menu {
  position: relative;
}
.guest-menu {
  display: flex;
  gap: 10px;
}
.avatar-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #c2185b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
}
.dropdown-menu {
  position: absolute;
  top: 120%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 220px;
  overflow: hidden;
  z-index: 1100;
}
.dropdown-header {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}
.dropdown-header strong {
  display: block;
}
.dropdown-header small {
  color: #888;
}
.dropdown-item {
  display: block;
  padding: 12px 15px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s;
}
.dropdown-item:hover {
  background-color: #f8f9fa;
}
.logout-item {
  cursor: pointer;
  color: #e74c3c;
}

/* Animasi untuk dropdown */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
