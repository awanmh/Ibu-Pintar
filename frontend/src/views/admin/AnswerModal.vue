<!-- src/components/admin/AnswerModal.vue -->
<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>Jawab Pertanyaan</h3>
      <p><strong>{{ question.title }}</strong></p>
      <textarea
        v-model="answer"
        rows="5"
        placeholder="Tulis jawaban Anda di sini..."
      ></textarea>

      <div class="modal-actions">
        <button @click="submitAnswer">Kirim</button>
        <button class="cancel" @click="$emit('close')">Batal</button>
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ApiService from '@/services/ApiService';

const props = defineProps({
  question: Object
});
const emit = defineEmits(['close', 'answered']);

const answer = ref('');
const errorMsg = ref('');

const submitAnswer = async () => {
  if (!answer.value.trim()) {
    errorMsg.value = 'Jawaban tidak boleh kosong.';
    return;
  }

  try {
    await ApiService.createAnswer(props.question.id, {
      content: answer.value
    });
    emit('answered');
    emit('close');
  } catch (err) {
    errorMsg.value = 'Gagal mengirim jawaban.';
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
textarea {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.modal-actions {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background-color: #880e4f;
  color: white;
  cursor: pointer;
}
button.cancel {
  background-color: #999;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
