// src/main.js

import { createApp } from 'vue';

// 1. Impor komponen root App.vue
import App from './App.vue';

// 2. Impor Router dan Store yang sudah kita buat
import router from './router';
import store from './store';

// 3. (Opsional tapi direkomendasikan) Impor file CSS global
import './assets/css/main.css';

// 4. Buat instance aplikasi Vue
const app = createApp(App);

// 5. Daftarkan Store dan Router agar bisa digunakan di seluruh aplikasi
app.use(store);
app.use(router);

// 6. Mount (pasang) aplikasi ke elemen dengan id="app" di public/index.html
app.mount('#app');