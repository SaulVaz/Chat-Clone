<template>
  <div class="message" :class="message.role">
    <!-- Avatar -->
    <div class="avatar" :class="message.role">
      <span v-if="message.role === 'assistant'">◆</span>
      <span v-else>Tú</span>
    </div>

    <!-- Bubble -->
    <div class="bubble" :class="message.role">
      <!-- Markdown renderizado para el asistente -->
      <div
        v-if="message.role === 'assistant'"
        class="markdown-body"
        v-html="renderedContent"
      ></div>
      <!-- Texto plano para el usuario -->
      <p v-else class="content">{{ message.content }}</p>
      <span v-if="isStreaming && message.role === 'assistant'" class="cursor">▋</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  isStreaming: {
    type: Boolean,
    default: false
  }
})

// Configurar marked
marked.setOptions({
  breaks: true,   // saltos de línea con Enter
  gfm: true       // GitHub Flavored Markdown
})

const renderedContent = computed(() => {
  if (!props.message.content) return ''
  return marked(props.message.content)
})
</script>

<style scoped>
.message {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  animation: fadeUp 0.2s ease;
}

.message.user {
  flex-direction: row-reverse;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
  margin-top: 2px;
}

.avatar.assistant {
  background: #1e1a33;
  color: #7c6aff;
  border: 1px solid #3a2e6a;
  font-size: 13px;
}

.avatar.user {
  background: #7c6aff;
  color: #fff;
  font-size: 10px;
}

.bubble {
  max-width: 72%;
  padding: 11px 15px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.65;
}

.bubble.assistant {
  background: #1a1a1f;
  color: #d8d8e4;
  border-radius: 4px 14px 14px 14px;
  border: 1px solid #2e2e38;
}

.bubble.user {
  background: #7c6aff;
  color: #fff;
  border-radius: 14px 4px 14px 14px;
}

.content {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.cursor {
  display: inline-block;
  color: #7c6aff;
  animation: blink 0.8s infinite;
  font-size: 13px;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Estilos del Markdown */
.markdown-body {
  word-break: break-word;
}

.markdown-body :deep(p) {
  margin: 0 0 8px;
}

.markdown-body :deep(p:last-child) {
  margin-bottom: 0;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 6px 0 8px;
  padding-left: 20px;
}

.markdown-body :deep(li) {
  margin-bottom: 3px;
}

.markdown-body :deep(strong) {
  color: #e8e8ec;
  font-weight: 600;
}

.markdown-body :deep(em) {
  color: #b8b8cc;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  color: #e8e8ec;
  font-weight: 600;
  margin: 12px 0 6px;
  line-height: 1.3;
}

.markdown-body :deep(h1) { font-size: 18px; }
.markdown-body :deep(h2) { font-size: 16px; }
.markdown-body :deep(h3) { font-size: 14px; }

/* Bloques de código */
.markdown-body :deep(pre) {
  background: #0a0a0d;
  border: 1px solid #2e2e38;
  border-radius: 8px;
  padding: 12px 14px;
  margin: 8px 0;
  overflow-x: auto;
  position: relative;
}

.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: #a8d8a8;
  line-height: 1.6;
}

/* Código inline */
.markdown-body :deep(code) {
  background: #0a0a0d;
  border: 1px solid #2e2e38;
  border-radius: 4px;
  padding: 1px 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #7c6aff;
}

.markdown-body :deep(blockquote) {
  border-left: 3px solid #7c6aff;
  margin: 8px 0;
  padding: 4px 12px;
  color: #888899;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid #2e2e38;
  margin: 12px 0;
}

.markdown-body :deep(a) {
  color: #7c6aff;
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0;
  font-size: 13px;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid #2e2e38;
  padding: 6px 10px;
  text-align: left;
}

.markdown-body :deep(th) {
  background: #0a0a0d;
  color: #e8e8ec;
  font-weight: 500;
}
</style>