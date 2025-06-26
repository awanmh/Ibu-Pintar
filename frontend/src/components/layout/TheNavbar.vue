<template>
  <header 
    class="navbar animate-fade-in" 
    :class="{ 'navbar-hidden': isHidden }"
  >
    <div class="container">
      <div class="brand">
        <router-link to="/" class="brand-link">
          <!-- Pastikan path logo Anda benar -->
          <img src="@/assets/images/logo.png" alt="Ibu Pintar Logo" class="logo-image" />
        </router-link>
      </div>
      
      <nav class="nav-links">
        <router-link to="/">Beranda</router-link>
        <router-link to="/articles">Artikel</router-link>
        <router-link to="/layanan">Layanan</router-link>
        <router-link to="/tanya-bidan">Tanya Bidan</router-link>
        <router-link to="/about">Tentang Kami</router-link>
      </nav>

      <!-- Placeholder di kanan untuk menyeimbangkan layout -->
      <div class="navbar-actions">
        <!-- Anda bisa menambahkan tombol Login/Daftar di sini nanti -->
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isHidden = ref(false);
let lastScrollY = window.scrollY;

const handleScroll = () => {
  const currentScroll = window.scrollY;
  // Sembunyikan navbar hanya jika scroll ke bawah dan sudah melewati tinggi navbar
  isHidden.value = currentScroll > lastScrollY && currentScroll > 80;
  lastScrollY = currentScroll <= 0 ? 0 : currentScroll; // Untuk handle scroll di paling atas
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* ANIMASI MASUK */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeInDown 0.6s ease-out forwards;
}

/* NAVBAR UTAMA */
.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: transform 0.4s ease-in-out;
}

/* HIDE navbar saat scroll down */
.navbar-hidden {
  transform: translateY(-100%);
}

/* CONTAINER dengan GRID LAYOUT */
.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* Kiri | Tengah | Kanan */
  align-items: center;
}

/* BRAND (LOGO) di Kiri */
.brand {
  justify-self: start; /* Rata kiri */
}
.brand-link {
  display: flex;
}
.logo-image {
  height: 50px;
}

/* NAV LINKS di Tengah */
.nav-links {
  justify-self: center; /* Rata tengah */
  display: flex;
  align-items: center;
  gap: 35px; /* Jarak antar link */
}
.nav-links a {
  font-weight: 600;
  position: relative;
  padding: 6px 0;
  color: #444;
  text-decoration: none;
  transition: all 0.3s ease;
}

/* ACTIONS (Placeholder) di Kanan */
.navbar-actions {
  justify-self: end; /* Rata kanan */
  /* Width sama dengan brand agar nav-links benar-benar di tengah */
  width: 162px; /* Sesuaikan dengan lebar logo Anda */
}

/* Hover & underline effect */
.nav-links a::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: #c2185b;
  transition: width 0.3s ease-in-out;
}
.nav-links a:hover {
  color: #c2185b;
}
.nav-links a:hover::after {
  width: 100%;
}

/* ACTIVE LINK */
.router-link-exact-active {
  color: #c2185b;
  font-weight: 700;
}
.router-link-exact-active::after {
  width: 100%;
}
</style>
