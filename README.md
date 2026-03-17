# Chat Clone

Un clon funcional de ChatGPT construido con Vue 3 y Node.js. Soporta streaming de respuestas en tiempo real, múltiples conversaciones con historial persistente y renderizado de Markdown con bloques de código.

## Demo

🔗 [chat-clone-one.vercel.app](https://chat-clone-saul.vercel.app)

## Stack

**Frontend**
- Vue 3 + Vite
- Pinia (manejo de estado)
- Tailwind CSS
- Marked (renderizado de Markdown)

**Backend**
- Node.js + Express
- Groq API (Llama 3.3 70b)
- Server-Sent Events (SSE) para streaming

## Features

- 💬 Streaming de respuestas letra por letra
- 🗂️ Múltiples conversaciones simultáneas
- 💾 Historial persistente con localStorage
- 📝 Renderizado de Markdown y bloques de código
- 🌙 Tema oscuro

## Correr localmente

### Requisitos
- Node.js 18+
- API Key de [Groq](https://console.groq.com)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Agrega tu GROQ_API_KEY en .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Variables de entorno

```bash
# backend/.env
GROQ_API_KEY=tu-api-key
PORT=3000
```

## Estructura

```
Chat-Clone/
├── frontend/          # Vue 3 app
│   └── src/
│       ├── components/
│       │   ├── AppSidebar.vue
│       │   ├── ChatWindow.vue
│       │   ├── MessageBubble.vue
│       │   └── MessageInput.vue
│       └── stores/
│           └── useChatStore.js
└── backend/           # Express API
    ├── routes/
    │   └── chat.js
    └── server.js
```
