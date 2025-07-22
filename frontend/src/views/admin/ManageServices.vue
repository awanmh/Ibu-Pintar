// === File: src/views/admin/ManageServices.vue ===
<template>
  <div class="admin-section">
    <h2>Manajemen Layanan (Reservasi)</h2>
    <div v-if="loading">Memuat reservasi...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <table v-if="reservations.length">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Layanan</th>
          <th>Tanggal</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in reservations" :key="r.id">
          <td>{{ r.name }}</td>
          <td>{{ r.service_type }}</td>
          <td>{{ r.date }}</td>
          <td>{{ r.status }}</td>
          <td>
            <select v-model="r.status" @change="updateStatus(r)">
              <option value="pending">Pending</option>
              <option value="confirmed">Dikonfirmasi</option>
              <option value="completed">Selesai</option>
              <option value="canceled">Dibatalkan</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApiService from '@/services/ApiService';

const reservations = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchReservations = async () => {
  loading.value = true;
  try {
    const res = await ApiService.getReservations();
    reservations.value = res.data;
  } catch (err) {
    error.value = 'Gagal memuat reservasi';
  } finally {
    loading.value = false;
  }
};

const updateStatus = async (reservation) => {
  try {
    await ApiService.updateReservation(reservation.id, { status: reservation.status });
    alert('Status diperbarui');
  } catch (err) {
    alert('Gagal memperbarui status');
  }
};

onMounted(fetchReservations);
</script>

<style scoped>
.admin-section {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
select {
  padding: 4px 6px;
}
.error {
  color: red;
  margin-bottom: 1em;
}
</style>
