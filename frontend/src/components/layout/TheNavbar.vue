<template>
  <header class="navbar" :class="{ 'navbar-hidden': isHidden }">
    <div class="container">
      <!-- Hamburger Menu (Mobile) -->
      <button class="hamburger" @click="toggleSidebar">
        &#9776;
      </button>

      <!-- Logo -->
      <div class="brand">
        <router-link to="/">
          <img src="@/assets/images/logo.jpg" alt="Ibu Pintar Logo" class="logo-image" />
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <nav class="nav-links desktop-only">
        <router-link to="/">Beranda</router-link>
        <router-link to="/articles">Artikel</router-link>
        <router-link to="/layanan">Layanan</router-link>
        <router-link to="/tanya-bidan">Tanya Bidan</router-link>
        <router-link to="/about">Tentang Kami</router-link>
      </nav>

      <!-- Actions -->
      <div class="navbar-actions desktop-only">
        <template v-if="isLoggedIn && user">
          <button @click="toggleDropdown" class="avatar-btn">
            <span>{{ user.name.charAt(0) }}</span>
          </button>
          <transition name="dropdown-fade">
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <div class="dropdown-header">
                <strong>{{ user.name }}</strong>
                <small>{{ user.email }}</small>
              </div>
              <router-link v-if="isAdmin" to="/admin" class="dropdown-item">Dashboard Admin</router-link>
              <a @click="handleLogout" class="dropdown-item logout-item">Logout</a>
            </div>
          </transition>
        </template>
        <template v-else>
          <router-link to="/login"><AppButton variant="secondary">Masuk</AppButton></router-link>
          <router-link to="/register"><AppButton variant="primary">Daftar</AppButton></router-link>
        </template>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <transition name="slide">
      <div class="mobile-sidebar" v-if="sidebarOpen">
        <nav class="mobile-nav">
          <router-link to="/" @click="closeSidebar">Beranda</router-link>
          <router-link to="/articles" @click="closeSidebar">Artikel</router-link>
          <router-link to="/layanan" @click="closeSidebar">Layanan</router-link>
          <router-link to="/tanya-bidan" @click="closeSidebar">Tanya Bidan</router-link>
          <router-link to="/about" @click="closeSidebar">Tentang Kami</router-link>

          <hr />

          <template v-if="isLoggedIn && user">
            <p><strong>{{ user.name }}</strong></p>
            <router-link v-if="isAdmin" to="/admin" @click="closeSidebar">Dashboard Admin</router-link>
            <a @click="handleLogout">Logout</a>
          </template>
          <template v-else>
            <router-link to="/login" @click="closeSidebar">Masuk</router-link>
            <router-link to="/register" @click="closeSidebar">Daftar</router-link>
          </template>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AppButton from '@/components/common/AppButton.vue';

const store = useStore();
const router = useRouter();

const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
const user = computed(() => store.getters['auth/currentUser']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);

const handleLogout = () => {
  isDropdownOpen.value = false;
  sidebarOpen.value = false;
  store.dispatch('auth/logout');
  router.push('/login');
};

// --- Scroll logic ---
const isHidden = ref(false);
let lastScrollY = window.scrollY;
const handleScroll = () => {
  const currentScroll = window.scrollY;
  isHidden.value = currentScroll > lastScrollY && currentScroll > 80;
  lastScrollY = currentScroll <= 0 ? 0 : currentScroll;
};

// --- Dropdown user menu (desktop) ---
const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const closeDropdown = (event) => {
  if (!event.target.closest('.avatar-btn') && !event.target.closest('.dropdown-menu')) {
    isDropdownOpen.value = false;
  }
};

// --- Sidebar (mobile) ---
const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
const closeSidebar = () => {
  sidebarOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', closeDropdown);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', closeDropdown);
});
</script>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: transform 0.4s ease-in-out;
}
.navbar-hidden {
  transform: translateY(-100%);
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
}
.logo-image {
  height: 45px;
}
.nav-links {
  display: flex;
  gap: 24px;
}
.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
}
.nav-links a:hover {
  color: #c2185b;
}
.router-link-exact-active {
  color: #c2185b;
}

/* Hamburger Menu */
.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  display: block;
}

/* Avatar */
.avatar-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c2185b;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}

/* Dropdown (desktop) */
.dropdown-menu {
  position: absolute;
  top: 60px;
  right: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 200px;
  padding: 10px;
  z-index: 999;
}
.dropdown-item {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
}
.dropdown-item:hover {
  background-color: #f5f5f5;
}
.logout-item {
  color: #e74c3c;
  cursor: pointer;
}

/* Mobile Sidebar */
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  background-color: white;
  box-shadow: 2px 0 8px rgba(0,0,0,0.15);
  padding: 20px;
  z-index: 2000;
}
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.mobile-nav a {
  text-decoration: none;
  color: #333;
  font-weight: 600;
}

/* Animation */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

/* Responsive */
.desktop-only {
  display: none;
}
@media (min-width: 768px) {
  .hamburger {
    display: none;
  }
  .desktop-only {
    display: flex;
  }
  .mobile-sidebar {
    display: none !important;
  }
}
</style>
