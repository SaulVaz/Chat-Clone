import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChatStore = defineStore('chat', () => {
  // State
  const chats = ref(loadFromStorage())
  const activeChatId = ref(chats.value[0]?.id || null)

  // Getters
  const activeChat = computed(() =>
    chats.value.find(c => c.id === activeChatId.value) || null
  )

  const messages = computed(() => activeChat.value?.messages || [])

  // Actions
  function createChat() {
    const id = `chat_${Date.now()}`
    const newChat = {
      id,
      title: 'Nuevo chat',
      createdAt: new Date().toISOString(),
      messages: []
    }
    chats.value.unshift(newChat)
    activeChatId.value = id
    saveToStorage()
    return id
  }

  function setActiveChat(id) {
    activeChatId.value = id
  }

  function addMessage(role, content) {
    if (!activeChatId.value) createChat()
    const chat = chats.value.find(c => c.id === activeChatId.value)
    if (!chat) return

    chat.messages.push({
      id: `msg_${Date.now()}`,
      role,   // 'user' | 'assistant'
      content,
      timestamp: new Date().toISOString()
    })

    // Auto-title: use first user message as title
    if (role === 'user' && chat.messages.filter(m => m.role === 'user').length === 1) {
      chat.title = content.slice(0, 40) + (content.length > 40 ? '...' : '')
    }

    saveToStorage()
  }

  function updateLastAssistantMessage(content) {
    const chat = chats.value.find(c => c.id === activeChatId.value)
    if (!chat) return
    const lastMsg = [...chat.messages].reverse().find(m => m.role === 'assistant')
    if (lastMsg) {
      lastMsg.content = content
      saveToStorage()
    }
  }

  function deleteChat(id) {
    chats.value = chats.value.filter(c => c.id !== id)
    if (activeChatId.value === id) {
      activeChatId.value = chats.value[0]?.id || null
    }
    saveToStorage()
  }

  // Persistence
  function saveToStorage() {
    localStorage.setItem('chatbot_chats', JSON.stringify(chats.value))
  }

  function loadFromStorage() {
    try {
      const data = localStorage.getItem('chatbot_chats')
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  // Init: create first chat if empty
  if (chats.value.length === 0) {
    createChat()
  }

  return {
    chats,
    activeChatId,
    activeChat,
    messages,
    createChat,
    setActiveChat,
    addMessage,
    updateLastAssistantMessage,
    deleteChat
  }
})