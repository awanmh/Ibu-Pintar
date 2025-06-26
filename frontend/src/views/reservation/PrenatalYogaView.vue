<template>
  <div class="page-container">
    <div class="service-header">
      <h1>Yoga Prenatal: Ketenangan untuk Anda dan Janin</h1>
      <p class="subtitle">Temukan keseimbangan, kekuatan, dan relaksasi dalam perjalanan kehamilan Anda melalui gerakan yoga yang aman dan menenangkan.</p>
    </div>

    <div class="service-content">
      <div class="content-section">
        <h2>Apa itu Yoga Prenatal?</h2>
        <p>
          Yoga prenatal adalah adaptasi dari yoga tradisional yang dirancang khusus untuk kebutuhan ibu hamil. Fokus utamanya adalah pada peregangan yang aman, pernapasan dalam (pranayama), dan postur yang mendukung perubahan tubuh selama kehamilan. Ini bukan hanya tentang latihan fisik, tetapi juga tentang menciptakan koneksi yang lebih dalam dengan bayi Anda dan mempersiapkan mental untuk persalinan.
        </p>
      </div>

      <div class="content-section">
        <h2>Manfaat Utama Yoga Prenatal</h2>
        <ul>
          <li>✔ Mengurangi stres dan kecemasan.</li>
          <li>✔ Meningkatkan kualitas tidur.</li>
          <li>✔ Mengurangi sakit punggung, mual, dan sakit kepala.</li>
          <li>✔ Meningkatkan kekuatan, fleksibilitas, dan daya tahan otot yang dibutuhkan untuk persalinan.</li>
          <li>✔ Meningkatkan sirkulasi darah.</li>
          <li>✔ Membantu menciptakan ikatan emosional dengan janin.</li>
        </ul>
      </div>

      <div class="content-section">
        <h2>Siapa yang Bisa Mengikuti Kelas Ini?</h2>
        <p>
          Kelas yoga prenatal kami dirancang untuk semua tingkat kebugaran dan aman untuk semua trimester kehamilan. Baik Anda seorang yogi berpengalaman atau baru pertama kali mencoba, instruktur kami yang bersertifikat akan memandu Anda melalui setiap gerakan dengan modifikasi yang sesuai. Namun, kami selalu menyarankan untuk berkonsultasi dengan dokter atau bidan Anda sebelum memulai program latihan baru.
        </p>
      </div>
      
      <div class="cta-section">
        <h2>Siap untuk Memulai Perjalanan Anda?</h2>
        <p>Bergabunglah dengan kelas kami dan rasakan manfaatnya secara langsung. Klik tombol di bawah ini untuk melihat jadwal dan melakukan reservasi.</p>
        <router-link to="/reservation">
          <AppButton variant="primary">Reservasi Kelas Yoga Prenatal</AppButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/common/AppButton.vue';
</script>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
}

.service-header {
  text-align: center;
  margin-bottom: 50px;
}

.service-header h1 {
  font-size: 2.8em;
  margin-bottom: 15px;
}

.subtitle {
  font-size: 1.2em;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
}

.content-section {
  margin-bottom: 40px;
}

.content-section h2 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #ffeff7;
  padding-bottom: 10px;
}

.content-section p, .content-section ul {
  line-height: 1.8;
  font-size: 1.1em;
  color: #4a5568;
}

.content-section ul {
  list-style: none;
  padding-left: 0;
}

.content-section ul li {
  margin-bottom: 10px;
}

.cta-section {
  background-color: #fff9fc;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  margin-top: 50px;
}

.cta-section h2 {
  border-bottom: none;
}
</style>