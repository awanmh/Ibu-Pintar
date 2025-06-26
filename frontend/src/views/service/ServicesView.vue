<template>
  <div class="services-view animate-fade-in">
    <section class="hero-section">
      <h1 class="animate-slide-up">Layanan Kami</h1>
      <p class="animate-slide-up delay">Temukan berbagai treatment yang sesuai dengan kebutuhan Anda</p>
    </section>

    <main class="container">
      <div class="filter-bar animate-slide-up">
        <button 
          @click="setFilter('all')" 
          :class="['filter-btn', { active: activeFilter === 'all' }]"
        >
          Semua Treatment
        </button>
        <button 
          @click="setFilter('single')" 
          :class="['filter-btn', { active: activeFilter === 'single' }]"
        >
          Single Treatment
        </button>
        <button 
          @click="setFilter('package')" 
          :class="['filter-btn', { active: activeFilter === 'package' }]"
        >
          Package Treatment
        </button>
      </div>

      <div class="services-grid">
        <div 
          v-for="(service, index) in filteredServices" 
          :key="service.id" 
          class="service-card animate-fade-in"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="card-image-wrapper">
            <img :src="service.image" :alt="service.name" />
            <span class="category-badge">{{ service.category }}</span>
          </div>
          <div class="card-content">
            <h3>{{ service.name }}</h3>
            <p class="price">Mulai dari Rp {{ service.starting_price.toLocaleString('id-ID') }}</p>
            <router-link :to="`/layanan/${service.slug}`" class="detail-btn">
              Lihat Detail Treatment
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { services } from '@/data/services.js';

const allServices = ref(services);
const activeFilter = ref('all');

const setFilter = (filter) => {
  activeFilter.value = filter;
};

const filteredServices = computed(() => {
  if (activeFilter.value === 'single') {
    return allServices.value;
  }
  if (activeFilter.value === 'package') {
    return [];
  }
  return allServices.value;
});
</script>

<style scoped>
/* ==== ANIMASI MODERN ==== */
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
  animation: slideUp 0.7s ease forwards;
  opacity: 0;
}
.delay {
  animation-delay: 0.2s;
}

/* ==== HERO SECTION ==== */
.hero-section {
  background: linear-gradient(135deg, #f8bbd0, #f8bbd0);
  color: #fff;
  text-align: center;
  padding: 60px 20px;
}
.hero-section h1 {
  font-size: 3em;
  font-weight: 700;
}
.hero-section p {
  font-size: 1.2em;
  margin-top: 10px;
}

/* ==== CONTAINER ==== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
}

/* ==== FILTER BAR ==== */
.filter-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}
.filter-btn {
  background-color: white;
  border: 1px solid #c2185b;
  color: #c2185b;
  padding: 10px 24px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}
.filter-btn:hover {
  background-color: #fce4ec;
}
.filter-btn.active {
  background-color: #c2185b;
  color: white;
}

/* ==== GRID ==== */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

/* ==== SERVICE CARD ==== */
.service-card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
}

/* ==== IMAGE WRAPPER ==== */
.card-image-wrapper {
  position: relative;
}
.card-image-wrapper img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  background-color: #f9f9f9;
  transition: transform 0.4s ease;
}
.card-image-wrapper img:hover {
  transform: scale(1.03);
}
.category-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75em;
  font-weight: bold;
  color: #c2185b;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* ==== CARD CONTENT ==== */
.card-content {
  padding: 20px;
}
.card-content h3 {
  margin: 0 0 10px;
  font-size: 1.2em;
  font-weight: 600;
}
.price {
  color: #757575;
  margin-bottom: 15px;
  font-weight: 500;
}

/* ==== DETAIL BUTTON ==== */
.detail-btn {
  display: block;
  text-align: center;
  background: transparent;
  border: 2px solid #c2185b;
  padding: 10px;
  border-radius: 8px;
  color: #c2185b;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}
.detail-btn:hover {
  background-color: #c2185b;
  color: white;
}
</style>
