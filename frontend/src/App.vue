<template>
  <div class="app-layout">
    <AppSidebar />
    <ChatWindow />
  </div>
</template>

<script setup>
import AppSidebar from './components/AppSidebar.vue'
import ChatWindow from './components/ChatWindow.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
</style>