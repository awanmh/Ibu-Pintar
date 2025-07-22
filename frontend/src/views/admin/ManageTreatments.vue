<template>
  <div class="treatment-admin">
    <div class="header">
      <h2>Manajemen Treatment</h2>
      <button @click="router.push('/admin/treatments/new')" class="add-btn">+ Tambah Treatment</button>
    </div>

    <div class="tabs">
      <button :class="{ active: filterType === 'all' }" @click="filterType = 'all'">Semua</button>
      <button :class="{ active: filterType === 'single' }" @click="filterType = 'single'">Single</button>
      <button :class="{ active: filterType === 'package' }" @click="filterType = 'package'">Package</button>
    </div>

    <div v-if="filteredTreatments.length === 0">Tidak ada treatment ditemukan.</div>

    <div class="treatment-list">
      <div class="treatment-card" v-for="t in filteredTreatments" :key="t.id">
        <img :src="t.imageUrl" alt="gambar" />
        <h3>{{ t.name }}</h3>
        <p><strong>Durasi:</strong> {{ t.duration }}</p>
        <p><strong>Kategori:</strong> {{ t.category }}</p>
        <p><strong>Harga:</strong> Rp{{ t.price.toLocaleString() }}</p>
        <p><strong>Tipe:</strong> {{ t.type }}</p>

        <div class="card-actions">
          <button @click="router.push(`/admin/treatments/edit/${t.id}`)">Edit</button>
          <button @click="handleDelete(t.id)" class="delete">Hapus</button>
          <button v-if="t.type === 'single'" @click="openPackageModal(t.id)">Tambah ke Paket</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Tambah ke Paket -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Pilih Paket</h3>
      <select v-model="selectedPackageId">
        <option disabled value="">-- Pilih Paket --</option>
        <option v-for="pkg in packageOptions" :value="pkg.id" :key="pkg.id">
          {{ pkg.name }}
        </option>
      </select>
      <div class="modal-actions">
        <button @click="addToPackage">Tambah</button>
        <button @click="showModal = false">Batal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';

const router = useRouter();
const treatments = ref([]);
const filterType = ref('all');

const selectedTreatmentId = ref(null);
const showModal = ref(false);
const packageOptions = ref([]);
const selectedPackageId = ref(null);

onMounted(async () => {
  const { data } = await ApiService.getAllTreatments();
  treatments.value = data;
});

const filteredTreatments = computed(() => {
  if (filterType.value === 'all') return treatments.value;
  return treatments.value.filter((t) => t.type === filterType.value);
});

const handleDelete = async (id) => {
  if (confirm('Yakin ingin menghapus treatment ini?')) {
    await ApiService.deleteTreatment(id);
    treatments.value = treatments.value.filter((t) => t.id !== id);
  }
};

const openPackageModal = async (treatmentId) => {
  selectedTreatmentId.value = treatmentId;
  showModal.value = true;
  const { data } = await ApiService.getAllTreatments();
  packageOptions.value = data.filter(t => t.type === 'package');
};

const addToPackage = async () => {
  try {
    await ApiService.addToPackage({
      packageId: selectedPackageId.value,
      treatmentId: selectedTreatmentId.value,
    });
    alert('Berhasil ditambahkan ke dalam paket!');
    showModal.value = false;
  } catch (err) {
    alert('Gagal menambahkan ke paket.');
    console.error(err);
  }
};
</script>

<style scoped>
.treatment-admin {
  padding: 1rem;
  max-width: 960px;
  margin: auto;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-btn {
  background: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.tabs {
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
}
.tabs button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: #f8f8f8;
  cursor: pointer;
}
.tabs button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}
.treatment-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.treatment-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 280px;
  background-color: #fafafa;
}
.treatment-card img {
  max-width: 100%;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}
.card-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}
.card-actions button {
  padding: 0.4rem 0.7rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.card-actions .delete {
  background: #dc3545;
  color: white;
}
.card-actions button:not(.delete) {
  background: #007bff;
  color: white;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
}
.modal-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
