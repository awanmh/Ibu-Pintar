// ServicesDetailView.vue
<template>
  <div class="service-detail-view animate-fade-in" v-if="service">
    <section class="hero-section">
      <div class="breadcrumb animate-slide-up">
        <router-link to="/">Home</router-link> / <router-link to="/layanan">Treatments</router-link> / {{ service.name }}
      </div>
      <h1 class="animate-slide-up delay-1">{{ service.name }}</h1>
      <p class="animate-slide-up delay-2">{{ service.description || '-' }}</p>
    </section>

    <main class="container">
      <div class="detail-content">
        <img :src="service.imageUrl" alt="Treatment Image" />
        <div class="info">
          <p><strong>Durasi:</strong> {{ service.duration || '-' }}</p>
          <p><strong>Kategori:</strong> {{ service.category || '-' }}</p>
          <p><strong>Harga:</strong> Rp {{ service.price?.toLocaleString('id-ID') || '0' }}</p>
          <router-link
            :to="`/reservasi?service=${encodeURIComponent(service.name)}`"
            class="booking-btn"
          >
            Booking Treatment
          </router-link>
        </div>
      </div>
    </main>
  </div>

  <div v-else class="container">
    <p>Sedang memuat data treatment...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '@/services/ApiService';

const route = useRoute();
const service = ref(null);

onMounted(async () => {
  try {
    const { data } = await ApiService.getTreatmentBySlug(route.params.slug);
    service.value = data;
  } catch (error) {
    console.error('Gagal memuat detail treatment:', error);
  }
});
</script>

<style scoped>
/* ==== ANIMASI ==== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
}
.animate-slide-up {
  animation: slideUp 0.6s ease forwards;
  opacity: 0;
}
.delay-1 {
  animation-delay: 0.2s;
}
.delay-2 {
  animation-delay: 0.4s;
}

/* ==== HERO SECTION ==== */
.hero-section {
  background: linear-gradient(135deg, #fce4ec, #f8bbd0);
  color: #880e4f;
  padding: 60px 20px;
  text-align: center;
}
.breadcrumb {
  font-size: 0.9em;
  margin-bottom: 16px;
}
.breadcrumb a {
  color: #ffffff;
  text-decoration: underline;
}
.hero-section h1 {
  font-size: 2.8em;
  font-weight: 700;
}
.hero-section p {
  font-size: 1.1em;
  max-width: 700px;
  margin: 10px auto 0;
}

/* ==== CONTAINER ==== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
}

/* ==== PACKAGE GRID ==== */
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}

/* ==== PACKAGE CARD ==== */
.package-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.package-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
}
.package-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f0f0f0;
}

/* ==== PACKAGE CONTENT ==== */
.package-content {
  padding: 20px;
}
.duration-badge {
  display: inline-block;
  background: #fdecef;
  color: #c2185b;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8em;
  margin-bottom: 12px;
  font-weight: 600;
}
.package-content h3 {
  margin: 0 0 8px;
  font-size: 1.2em;
  font-weight: 600;
}
.package-content p {
  color: #555;
  font-size: 0.95em;
}

/* ==== FOOTER ==== */
.package-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 15px;
}
.price {
  font-weight: bold;
  font-size: 1.2em;
  color: #444;
}

/* ==== BOOKING BUTTON ==== */
.booking-btn {
  background-color: #c2185b;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}
.booking-btn:hover {
  background-color: #ad1457;
}
</style>
