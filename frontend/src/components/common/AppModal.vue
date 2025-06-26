<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <button class="close-button" @click="closeModal">&times;</button>
        
        <div class="modal-header" v-if="$slots.header">
          <slot name="header">Judul Default</slot>
        </div>
        
        <div class="modal-body">
          <slot name="body">Konten modal di sini...</slot>
        </div>
        
        <div class="modal-footer" v-if="$slots.footer">
          <slot name="footer">
            <AppButton @click="closeModal" variant="secondary">Tutup</AppButton>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch } from 'vue';
import AppButton from './AppButton.vue';

// Mendefinisikan props dan emits untuk v-model
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:show']);

// Fungsi untuk menutup modal
const closeModal = () => {
  emit('update:show', false);
};

// Menambahkan event listener untuk tombol 'Escape' saat modal terbuka
watch(() => props.show, (newValue) => {
  if (newValue) {
    window.addEventListener('keydown', onEscape);
  } else {
    window.removeEventListener('keydown', onEscape);
  }
});

const onEscape = (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-container {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  position: relative;
  transform: scale(0.95);
  transition: transform 0.3s ease;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  background: none;
  font-size: 2rem;
  font-weight: bold;
  color: #aaa;
  cursor: pointer;
  line-height: 1;
}

.modal-header {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  border-top: 1px solid #eee;
  padding-top: 20px;
  text-align: right;
}

/* Animasi untuk transisi */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container,
.modal-fade-leave-active .modal-container {
    transition: transform 0.3s ease;
}

.modal-fade-enter-to .modal-container {
    transform: scale(1);
}

.modal-fade-leave-to .modal-container {
    transform: scale(0.95);
}
</style>