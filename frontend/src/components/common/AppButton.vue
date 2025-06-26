<template>
  <button
    :type="type"
    :class="['btn', `btn-${variant}`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot> </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'button', // Tipe default adalah 'button'
    },
    variant: {
      type: String,
      default: 'primary', // Varian style: 'primary', 'secondary', dll.
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'], // Mendeklarasikan event yang di-emit
};
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}
.btn:hover {
  opacity: 0.9;
}
.btn:active {
  transform: scale(0.98);
}
.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Varian warna */
.btn-primary {
  background-color: #ff69b4; /* Hot Pink */
  color: white;
}
.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}
</style>