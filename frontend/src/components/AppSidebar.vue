<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">◆</span>
        <span class="logo-text">Claude Chat</span>
      </div>
      <button @click="store.createChat()" class="new-chat-btn" title="Nuevo chat">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Chat list -->
    <nav class="chat-list">
      <p v-if="store.chats.length === 0" class="empty-msg">Sin conversaciones</p>

      <div
        v-for="chat in store.chats"
        :key="chat.id"
        class="chat-item"
        :class="{ active: chat.id === store.activeChatId }"
        @click="store.setActiveChat(chat.id)"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" class="chat-icon">
          <path d="M2 3h12a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V4a1 1 0 011-1z" stroke="currentColor" stroke-width="1" fill="none"/>
        </svg>
        <span class="chat-title">{{ chat.title }}</span>
        <button
          class="delete-btn"
          @click.stop="store.deleteChat(chat.id)"
          title="Eliminar"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer">
      <div class="model-badge">
        <span class="model-dot"></span>
        claude-sonnet-4
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useChatStore } from '../stores/useChatStore'
const store = useChatStore()
</script>

<style scoped>
.sidebar {
  width: 240px;
  min-width: 240px;
  height: 100%;
  background: #0f0f11;
  border-right: 1px solid #1e1e26;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 14px 12px;
  border-bottom: 1px solid #1e1e26;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  color: #7c6aff;
  font-size: 14px;
}

.logo-text {
  font-size: 14px;
  font-weight: 600;
  color: #e8e8ec;
  letter-spacing: -0.01em;
}

.new-chat-btn {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  border: 1px solid #2e2e38;
  background: transparent;
  color: #888899;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}

.new-chat-btn:hover {
  background: #1e1e26;
  color: #e8e8ec;
  border-color: #3e3e4e;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.empty-msg {
  font-size: 12px;
  color: #555566;
  text-align: center;
  margin-top: 24px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.12s;
  color: #888899;
  position: relative;
}

.chat-item:hover {
  background: #1a1a1f;
  color: #c8c8d4;
}

.chat-item.active {
  background: #1e1a33;
  color: #e8e8ec;
  border: 1px solid #3a2e6a;
}

.chat-icon {
  flex-shrink: 0;
  opacity: 0.6;
}

.chat-title {
  flex: 1;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  display: none;
  background: transparent;
  border: none;
  color: #555566;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  flex-shrink: 0;
  transition: color 0.1s;
}

.chat-item:hover .delete-btn {
  display: flex;
}

.delete-btn:hover {
  color: #ff6b6b;
}

.sidebar-footer {
  padding: 12px 14px;
  border-top: 1px solid #1e1e26;
}

.model-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #555566;
  font-family: 'JetBrains Mono', monospace;
}

.model-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7c6aff;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>