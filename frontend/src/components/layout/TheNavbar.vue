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
          <div class="profile-container">
            <button @click="toggleDropdown" class="avatar-btn">
              <span>{{ user.name.charAt(0).toUpperCase() }}</span>
            </button>
            <transition name="dropdown-fade">
              <div v-if="isDropdownOpen" class="dropdown-menu">
                <div class="dropdown-header">
                  <div class="dropdown-avatar">
                    <span>{{ user.name.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div class="user-info">
                    <strong>{{ user.name }}</strong>
                    <small>{{ user.email }}</small>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <router-link v-if="isAdmin" to="/admin" class="dropdown-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  <span>Dashboard Admin</span>
                </router-link>
                <a @click="handleLogout" class="dropdown-item logout-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  <span>Logout</span>
                </a>
              </div>
            </transition>
          </div>
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

          <hr class="mobile-divider" />

          <template v-if="isLoggedIn && user">
            <div class="mobile-profile">
              <strong>{{ user.name }}</strong>
              <small>{{ user.email }}</small>
            </div>
            <router-link v-if="isAdmin" to="/admin" @click="closeSidebar" class="mobile-link">Dashboard Admin</router-link>
            <a @click="handleLogout" class="mobile-link logout-item">Logout</a>
          </template>
          <template v-else>
            <router-link to="/login" @click="closeSidebar" class="mobile-link">Masuk</router-link>
            <router-link to="/register" @click="closeSidebar" class="mobile-link">Daftar</router-link>
          </template>
        </nav>
      </div>
    </transition>
    <!-- Overlay for mobile sidebar -->
    <div class="sidebar-overlay" v-if="sidebarOpen" @click="closeSidebar"></div>
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

// --- Sidebar (mobile) ---
const sidebarOpen = ref(false);
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
const closeSidebar = () => {
  sidebarOpen.value = false;
};

// --- Close menus when clicking outside ---
const closeMenus = (event) => {
  // Close dropdown if click is outside profile container
  if (isDropdownOpen.value && !event.target.closest('.profile-container')) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', closeMenus);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', closeMenus);
});
</script>

<style scoped>
/* === BASE NAVBAR STYLES === */
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
  max-width: 1200px;
  margin: 0 auto;
}
.logo-image {
  height: 45px;
  display: block;
}
.nav-links {
  display: flex;
  gap: 28px;
  margin: 0 auto; /* Center nav links */
}
.nav-links a {
  text-decoration: none;
  color: #4a4a4a;
  font-weight: 600;
  position: relative;
  padding-bottom: 4px;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #c2185b;
  transition: width 0.3s ease;
}
.nav-links a:hover::after,
.nav-links a.router-link-exact-active::after {
  width: 100%;
}
.nav-links a.router-link-exact-active {
  color: #c2185b;
}
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* === PROFILE DROPDOWN (REDESIGNED) === */
.profile-container {
  position: relative;
}
.avatar-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c2185b;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 0 0 2px #c2185b;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.avatar-btn:hover {
  transform: scale(1.1);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  width: 240px;
  z-index: 1001;
  border: 1px solid #eee;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
}
.dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fce4ec;
  color: #c2185b;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  overflow: hidden;
}
.user-info strong {
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-info small {
  color: #777;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dropdown-divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #4a4a4a;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.dropdown-item:hover {
  background-color: #f5f5f5;
  color: #c2185b;
}
.dropdown-item svg {
  color: #999;
  transition: color 0.2s ease;
}
.dropdown-item:hover svg {
  color: #c2185b;
}
.logout-item {
  color: #d32f2f;
  cursor: pointer;
}
.logout-item:hover {
  background-color: #ffebee;
  color: #c62828;
}
.logout-item:hover svg {
  color: #c62828;
}

/* Dropdown Animation */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* === MOBILE & RESPONSIVE === */
.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  display: none; /* Hidden by default */
}
.mobile-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 260px;
  background-color: white;
  box-shadow: 2px 0 8px rgba(0,0,0,0.15);
  padding: 60px 20px 20px;
  z-index: 2000;
  transform: translateX(-100%);
}
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1999;
  transition: opacity 0.3s ease;
}
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.mobile-nav a {
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}
.mobile-divider {
  margin: 10px 0;
  border: 0;
  border-top: 1px solid #eee;
}
.mobile-profile {
  padding: 10px 0;
}
.mobile-link {
  padding: 8px 0;
}

/* Animation */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}

/* Responsive Breakpoints */
.desktop-only {
  display: flex;
}
@media (max-width: 768px) {
  .nav-links, .navbar-actions.desktop-only {
    display: none;
  }
  .hamburger {
    display: block;
  }
  .brand {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
