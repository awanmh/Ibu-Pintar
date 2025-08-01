<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container hero-content">
        <h1 class="animate-on-load" data-anim-order="1">Menemani Setiap Langkah Calon Ibu</h1>
        <p class="animate-on-load" data-anim-order="2">Sumber informasi dan layanan terpercaya untuk calon ibu. Jelajahi artikel, forum, dan layanan kami.</p>
        <router-link to="/tanya-bidan" class="animate-on-load" data-anim-order="3">
          <AppButton variant="primary" class="hero-button">Tanya Bidan</AppButton>
        </router-link>
      </div>
    </section>

    <!-- Featured Articles Section -->
    <section class="featured-articles">
      <div class="container">
        <div class="section-header animate-on-load" data-anim-order="4">
          <h2>Artikel Terbaru Untuk Anda</h2>
          <router-link to="/articles" class="see-all-link">Lihat Semua &gt;</router-link>
        </div>
        <div class="animate-on-load" data-anim-order="5">
            <ArticleCarousel v-if="featuredArticles.length > 0" :articles="featuredArticles" />
            <div v-else-if="loading" class="loading">Memuat artikel...</div>
        </div>
      </div>
    </section>
    
    <!-- ### BAGIAN BARU DITAMBAHKAN DI SINI ### -->
    <section class="why-us-section">
        <div class="container">
            <h2 class="animate-on-load" data-anim-order="6">Mengapa Memilih Ibu Pintar?</h2>
            <p class="section-subtitle animate-on-load" data-anim-order="7">Kami berkomitmen untuk memberikan yang terbaik bagi para calon ibu di setiap fase kehamilan.</p>
            <div class="features-grid">
                <div class="feature-card animate-on-load" data-anim-order="8">
                    <div class="feature-icon">🩺</div>
                    <h3>Konten Terpercaya</h3>
                    <p>Semua artikel dan panduan kami disusun dan diverifikasi oleh bidan dan dokter berpengalaman.</p>
                </div>
                <div class="feature-card animate-on-load" data-anim-order="9">
                    <div class="feature-icon">💬</div>
                    <h3>Komunitas Hangat</h3>
                    <p>Bergabunglah dengan forum "Tanya Bidan" untuk berbagi cerita dan mendapatkan dukungan sesama ibu.</p>
                </div>
                <div class="feature-card animate-on-load" data-anim-order="10">
                    <div class="feature-icon">💖</div>
                    <h3>Layanan Profesional</h3>
                    <p>Nikmati layanan prenatal berkualitas yang dirancang khusus untuk menjaga kesehatan ibu dan bayi.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
        <div class="container">
            <h2 class="animate-on-load" data-anim-order="11">Layanan Unggulan Kami</h2>
            <div class="service-cards">
                <div class="service-card animate-on-load" data-anim-order="12">
                    <div class="service-icon">🧘‍♀️</div>
                    <h3>Yoga Prenatal</h3>
                    <p>Tingkatkan fleksibilitas dan ketenangan Anda selama kehamilan dengan kelas yoga yang dirancang khusus.</p>
                    <router-link to="/layanan/prenatal-massage">
                        <AppButton variant="secondary">Lihat Detail</AppButton>
                    </router-link>
                </div>
                <div class="service-card animate-on-load" data-anim-order="13">
                    <div class="service-icon">👶</div>
                    <h3>Pijat Bayi</h3>
                    <p>Pelajari teknik pijat bayi untuk meningkatkan ikatan dan merangsang perkembangan si kecil. (Segera Hadir)</p>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ApiService from '@/services/ApiService';
import AppButton from '@/components/common/AppButton.vue';
import ArticleCarousel from '@/components/articles/ArticleCarousel.vue';

const articles = ref([]);
const loading = ref(true);
const featuredArticles = computed(() => articles.value.slice(0, 5));

onMounted(async () => {
  try {
    const response = await ApiService.getArticles();
    articles.value = response.data || [];
  } catch (error) {
    console.error('Gagal memuat artikel:', error);
  } finally {
    loading.value = false;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-load').forEach((el) => {
    observer.observe(el);
  });
});
</script>

<style scoped>
/* Animasi Fade In dan Slide Up */
.animate-on-load {
  opacity: 0;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  transform: translateY(20px);
}
.animate-on-load.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animation delay */
.animate-on-load[data-anim-order="1"] { transition-delay: 0.1s; }
.animate-on-load[data-anim-order="2"] { transition-delay: 0.2s; }
.animate-on-load[data-anim-order="3"] { transition-delay: 0.3s; }
.animate-on-load[data-anim-order="4"] { transition-delay: 0.1s; } /* Reset delay */
.animate-on-load[data-anim-order="5"] { transition-delay: 0.2s; }
.animate-on-load[data-anim-order="6"] { transition-delay: 0.1s; }
.animate-on-load[data-anim-order="7"] { transition-delay: 0.2s; }
.animate-on-load[data-anim-order="8"] { transition-delay: 0.2s; }
.animate-on-load[data-anim-order="9"] { transition-delay: 0.3s; }
.animate-on-load[data-anim-order="10"] { transition-delay: 0.4s; }
.animate-on-load[data-anim-order="11"] { transition-delay: 0.1s; }
.animate-on-load[data-anim-order="12"] { transition-delay: 0.2s; }
.animate-on-load[data-anim-order="13"] { transition-delay: 0.3s; }

/* General Styles */
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
h2 { text-align: center; font-size: 2.25em; margin-bottom: 20px; color: #343a40; }
.section-subtitle { text-align: center; max-width: 600px; margin: 0 auto 50px; color: #6c757d; font-size: 1.1rem; }

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%);
  padding: 300px 0;
  text-align: center;
  overflow: hidden;
  color: white;
}
.hero-content h1 { 
  font-size: 3.5rem; 
  color: #ffffff;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
}
.hero-content p { 
  font-size: 1.25rem; 
  color: #ffffff;
  margin: 25px auto 40px;
  max-width: 600px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
}
.hero-button {
    transform: scale(1.1);
    background-color: white !important;
    color: #ee9ca7 !important;
    border: none !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

/* Featured Articles & Why Us Section */
.featured-articles, .why-us-section, .services-section { 
  padding: 200px 0; 
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.section-header h2 {
  text-align: left;
  margin-bottom: 0;
}
.see-all-link {
  font-weight: bold;
  text-decoration: none;
  color: #c2185b;
}

/* Why Us Section */
.why-us-section {
  background-color: #fdf8f9;
}
.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 50px;
}
.feature-card {
    background: #ffffff;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #fce4ec;
}
.feature-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
}
.feature-card h3 {
    font-size: 1.4rem;
    margin-bottom: 10px;
    color: #4a4a4a;
}
.feature-card p {
    color: #6c757d;
}

/* Services Section */
.services-section {
    background-color: #ffffff;
}
.service-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.service-card { 
  background: white; 
  padding: 40px; 
  border-radius: 16px; 
  box-shadow: 0 8px 30px rgba(0,0,0,0.08); 
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}
.service-icon {
    font-size: 3rem;
    margin-bottom: 15px;
}
.service-card h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #343a40;
}
.service-card p {
    color: #6c757d;
    margin-bottom: 25px;
}
</style>
