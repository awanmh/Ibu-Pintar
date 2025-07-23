<template>
  <div class="about-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="title">Tentang Kami</h1>
        <p class="subtitle">Mendampingi Perjalanan Ibu Menuju Kesehatan dan Kebahagiaan</p>
      </div>
    </section>

    <section class="content-section">
      <div class="container">
        <h2 class="section-title">Kenapa Ibu Pintar?</h2>
        <p class="text">
          <strong>Ibu Pintar</strong> adalah platform digital yang dirancang untuk mendukung para calon ibu dan wanita
          dalam mendapatkan informasi terpercaya seputar kehamilan, persalinan, masa nifas, perawatan bayi, dan kesehatan reproduksi wanita.
          Kami percaya bahwa ibu yang sehat dan berdaya adalah fondasi dari generasi masa depan yang kuat.
        </p>

        <h2 class="section-title">Apa yang Kami Tawarkan</h2>
        <ul class="features-list">
          <li><span>✔</span> Artikel terpercaya berbasis bukti ilmiah </li>
          <li><span>✔</span> Forum Tanya Bidan untuk mendapatkan jawaban langsung</li>
          <li><span>✔</span> Beragam layanan treatment untuk kenyamanan dan kesehatan ibu hamil serta persiapan menjadi orang tua </li>
          <li><span>✔</span> Navigasi mudah dan desain yang ramah pengguna</li>
        </ul>

        <h2 class="section-title">Misi Kami</h2>
        <p class="text">
          Misi kami adalah menjadikan teknologi sebagai teman terbaik wanita dalam setiap fase kehidupan seorang wanita —
          dari masa remaja, kehamilan, melahirkan, perawatan bayi hingga kesehatan reproduksi. Dengan informasi yang jelas dan terpercaya,
          kami ingin setiap wanita merasa berdaya, didukung, teredukasi, dan dihargai.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.hero-section {
  background: linear-gradient(to right, #f8bbd0, #f48fb1);
  padding: 60px 20px;
  text-align: center;
  color: #fff;
  animation: fadeIn 0.6s ease-out;
}

.hero-content .title {
  font-size: 2.8rem;
  font-weight: bold;
}

.hero-content .subtitle {
  font-size: 1.2rem;
  margin-top: 10px;
}

.content-section {
  background: #fff;
  padding: 60px 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.5rem;
  color: #c2185b;
  margin-top: 40px;
  margin-bottom: 15px;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background-color: #f48fb1;
  margin-top: 8px;
  border-radius: 3px;
}

.text {
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 25px;
}

.features-list {
  list-style: none;
  padding-left: 0;
  margin-top: 10px;
}

.features-list li {
  margin-bottom: 10px;
  font-size: 1rem;
}

.features-list span {
  color: #c2185b;
  margin-right: 10px;
  font-weight: bold;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsif */
@media (max-width: 768px) {
  .hero-content .title {
    font-size: 2rem;
  }
  .section-title {
    font-size: 1.3rem;
  }
  .text {
    font-size: 0.95rem;
  }
}
</style>
