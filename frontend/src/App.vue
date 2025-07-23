  <!-- src/App.vue -->
  <template>
    <div id="app-wrapper">
      <!-- Navbar akan selalu tampil di atas -->
      <TheNavbar />

      <!-- 
        <router-view> adalah komponen khusus dari Vue Router.
        Di sinilah semua komponen dari folder /views akan dirender.
        Kita bungkus dengan <transition> agar ada efek fade saat berpindah halaman.
      -->
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      
      <!-- Footer akan selalu tampil di bawah -->
      <TheFooter />
    </div>
  </template>

  <script setup>
  import TheNavbar from '@/components/layout/TheNavbar.vue';
  import TheFooter from '@/components/layout/TheFooter.vue';
  </script>

  <style>
  /* Style di sini TIDAK 'scoped' agar bisa berlaku global.
    Ini tempat yang baik untuk mendefinisikan style dasar dan efek transisi.
  */

  /* Efek transisi antar halaman */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  /* Style dasar untuk layout */
  #app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex-grow: 1; /* Mendorong footer ke bawah halaman */
  }
  </style>    