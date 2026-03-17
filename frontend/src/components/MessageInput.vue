<template>
  <div class="input-wrapper">
    <div class="input-box" :class="{ focused }">
      <textarea
        ref="textareaRef"
        v-model="text"
        placeholder="Escribe un mensaje..."
        rows="1"
        :disabled="loading"
        @focus="focused = true"
        @blur="focused = false"
        @keydown.enter.exact.prevent="submit"
        @input="autoResize"
      />
      <button
        class="send-btn"
        :class="{ active: text.trim() && !loading }"
        :disabled="!text.trim() || loading"
        @click="submit"
      >
        <svg v-if="!loading" width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span v-else class="spinner"></span>
      </button>
    </div>
    <p class="hint">Enter para enviar · Shift+Enter para nueva línea</p>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['send'])

const text = ref('')
const focused = ref(false)
const textareaRef = ref(null)

function submit() {
  const msg = text.value.trim()
  if (!msg || props.loading) return
  emit('send', msg)
  text.value = ''
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
  })
}

function autoResize() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 140) + 'px'
}
</script>

<style scoped>
.input-wrapper {
  padding: 12px 20px 16px;
  background: #0f0f11;
  border-top: 1px solid #1e1e26;
}

.input-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #1a1a1f;
  border: 1px solid #2e2e38;
  border-radius: 13px;
  padding: 10px 12px;
  transition: border-color 0.15s;
}

.input-box.focused {
  border-color: #7c6aff;
}

textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  color: #e8e8ec;
  line-height: 1.55;
  max-height: 140px;
  overflow-y: auto;
}

textarea::placeholder {
  color: #444455;
}

textarea:disabled {
  opacity: 0.5;
}

.send-btn {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  border: none;
  background: #2e2e38;
  color: #555566;
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;
}

.send-btn.active {
  background: #7c6aff;
  color: #fff;
  cursor: pointer;
}

.send-btn.active:hover {
  background: #9581ff;
}

.send-btn.active:active {
  transform: scale(0.95);
}

.hint {
  font-size: 11px;
  color: #333344;
  text-align: center;
  margin-top: 8px;
}

.spinner {
  width: 12px;
  height: 12px;
  border: 1.5px solid rgba(255,255,255,0.2);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>