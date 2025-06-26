<template>
  <div class="carousel-container">
    <div class="carousel-wrapper" ref="carouselWrapper">
      <CarouselCard 
        v-for="article in articles" 
        :key="article.id" 
        :article="article"
      />
    </div>
    <button @click="scrollLeft" class="nav-btn prev-btn">&lt;</button>
    <button @click="scrollRight" class="nav-btn next-btn">&gt;</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CarouselCard from './CarouselCard.vue';

defineProps({
  articles: {
    type: Array,
    required: true,
  },
});

const carouselWrapper = ref(null);

const scrollLeft = () => {
  if (carouselWrapper.value) {
    // Geser ke kiri sebesar lebar satu kartu + jaraknya
    carouselWrapper.value.scrollBy({ left: -300, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (carouselWrapper.value) {
    // Geser ke kanan sebesar lebar satu kartu + jaraknya
    carouselWrapper.value.scrollBy({ left: 300, behavior: 'smooth' });
  }
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
}

.carousel-wrapper {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  /* Sembunyikan scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}
.carousel-wrapper::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prev-btn {
  left: -20px;
}

.next-btn {
  right: -20px;
}
</style>
