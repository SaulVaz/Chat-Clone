<template>
  <div class="chat-window">
    <!-- Header -->
    <div class="chat-header">
      <span class="chat-title">{{ store.activeChat?.title || 'Nuevo chat' }}</span>
      <div class="header-badge">
        <span class="badge-dot"></span>
        Llama 3.3 70b
      </div>
    </div>

    <!-- Messages -->
    <div class="messages-area" ref="messagesRef">
      <!-- Empty state -->
      <div v-if="store.messages.length === 0" class="empty-state">
        <div class="empty-icon">◆</div>
        <h2 class="empty-title">¿En qué puedo ayudarte?</h2>
        <p class="empty-sub">Escribe un mensaje para comenzar</p>
        <div class="suggestions">
          <button
            v-for="s in suggestions"
            :key="s"
            class="suggestion-chip"
            @click="sendSuggestion(s)"
          >{{ s }}</button>
        </div>
      </div>

      <!-- Messages list -->
      <div v-else class="messages-list">
        <MessageBubble
          v-for="(msg, i) in store.messages"
          :key="msg.id"
          :message="msg"
          :isStreaming="loading && i === store.messages.length - 1 && msg.role === 'assistant'"
        />
      </div>
    </div>

    <!-- Input -->
    <MessageInput :loading="loading" @send="handleSend" />
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import MessageBubble from './MessageBubble.vue'
import MessageInput from './MessageInput.vue'
import { useChatStore } from '../stores/useChatStore'

const store = useChatStore()
const loading = ref(false)
const messagesRef = ref(null)

const suggestions = [
  '¿Qué puedes hacer?',
  'Explícame las promesas en JavaScript',
  'Escribe un componente Vue básico',
  '¿Cuál es la diferencia entre ref y reactive?'
]

function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

watch(() => store.messages.length, scrollToBottom)

function sendSuggestion(text) {
  handleSend(text)
}

async function handleSend(userMessage) {
  if (loading.value) return

  // Agregar mensaje del usuario
  store.addMessage('user', userMessage)
  scrollToBottom()

  // Agregar mensaje vacío del asistente que se irá llenando
  store.addMessage('assistant', '')
  loading.value = true
  scrollToBottom()

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: store.messages
          .slice(0, -1)
          .map(m => ({ role: m.role, content: m.content }))
      })
    })

    if (!response.ok) throw new Error('Error en el servidor')

    // Leer el stream token por token
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullContent = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim()

          if (data === '[DONE]') break

          try {
            const parsed = JSON.parse(data)
            if (parsed.token) {
              fullContent += parsed.token
              // Actualizar el mensaje en tiempo real
              store.updateLastAssistantMessage(fullContent)
              scrollToBottom()
            }
          } catch {
            // ignorar líneas que no son JSON válido
          }
        }
      }
    }

  } catch (err) {
    store.updateLastAssistantMessage('Lo siento, ocurrió un error. Intenta de nuevo.')
    console.error(err)
  } finally {
    loading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #0f0f11;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid #1e1e26;
  flex-shrink: 0;
}

.chat-title {
  font-size: 14px;
  font-weight: 500;
  color: #c8c8d4;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #555566;
  font-family: 'JetBrains Mono', monospace;
  background: #1a1a1f;
  border: 1px solid #2e2e38;
  padding: 4px 10px;
  border-radius: 20px;
}

.badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #4ade80;
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
  text-align: center;
}

.empty-icon {
  font-size: 32px;
  color: #7c6aff;
  margin-bottom: 8px;
}

.empty-title {
  font-size: 22px;
  font-weight: 600;
  color: #e8e8ec;
  letter-spacing: -0.02em;
}

.empty-sub {
  font-size: 14px;
  color: #555566;
  margin-bottom: 8px;
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  max-width: 520px;
  margin-top: 12px;
}

.suggestion-chip {
  font-size: 13px;
  padding: 8px 14px;
  background: #1a1a1f;
  border: 1px solid #2e2e38;
  border-radius: 20px;
  color: #888899;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'DM Sans', sans-serif;
}

.suggestion-chip:hover {
  background: #1e1a33;
  border-color: #3a2e6a;
  color: #c8c8d4;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>