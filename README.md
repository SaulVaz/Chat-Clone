<div align="center">
 
# 💬 Chat Clone
 
**Un clon funcional de ChatGPT con streaming en tiempo real, construido con Vue 3 y Node.js.**
 
[![Demo](https://img.shields.io/badge/Demo%20en%20vivo-chat--clone--saul.vercel.app-6366f1?style=for-the-badge&logo=vercel)](https://chat-clone-saul.vercel.app)
[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/Licencia-MIT-blue?style=for-the-badge)](LICENSE)
 
![screenshot](<img width="1919" height="914" alt="image" src="https://github.com/user-attachments/assets/c8e215dd-5739-489a-8c42-2fcd55f08c24" />
)
 
</div>
 
---
 
## ✨ Características
 
| Feature | Descripción |
|---|---|
| ⚡ **Streaming en tiempo real** | Respuestas letra por letra usando Server-Sent Events (SSE) |
| 🗂️ **Multi-conversación** | Gestiona múltiples chats simultáneos en la barra lateral |
| 💾 **Historial persistente** | Las conversaciones se guardan automáticamente con `localStorage` |
| 📝 **Markdown + Código** | Renderizado completo de Markdown con resaltado de bloques de código |
| 🌙 **Tema oscuro** | Interfaz oscura inspirada en ChatGPT |
 
---
 
## 🛠️ Stack Tecnológico
 
### Frontend
- **[Vue 3](https://vuejs.org/)** + **[Vite](https://vitejs.dev/)** — Framework reactivo con build ultrarrápido
- **[Pinia](https://pinia.vuejs.org/)** — Manejo de estado global
- **[Tailwind CSS](https://tailwindcss.com/)** — Estilos utilitarios
- **[Marked](https://marked.js.org/)** — Renderizado de Markdown
 
### Backend
- **[Node.js](https://nodejs.org/)** + **[Express](https://expressjs.com/)** — Servidor HTTP
- **[Groq API](https://console.groq.com)** (Llama 3.3 70B) — Modelo de lenguaje
- **Server-Sent Events (SSE)** — Protocolo de streaming
 
---
 
## 🏗️ Arquitectura del Proyecto
 
```
Chat-Clone/
├── frontend/                  # Aplicación Vue 3
│   └── src/
│       ├── components/
│       │   ├── AppSidebar.vue       # Lista de conversaciones
│       │   ├── ChatWindow.vue       # Ventana principal del chat
│       │   ├── MessageBubble.vue    # Burbuja de cada mensaje
│       │   └── MessageInput.vue     # Input con soporte de envío
│       └── stores/
│           └── useChatStore.js      # Estado global (Pinia)
│
└── backend/                   # API Express
    ├── routes/
    │   └── chat.js                  # Endpoint de streaming con SSE
    └── server.js                    # Punto de entrada del servidor
```
 
---
 
## 🚀 Instalación y uso local
 
### Requisitos previos
- [Node.js](https://nodejs.org/) v18 o superior
- API Key de [Groq](https://console.groq.com) (gratuita)
 
### 1. Clonar el repositorio
 
```bash
git clone https://github.com/SaulVaz/Chat-Clone.git
cd Chat-Clone
```
 
### 2. Configurar el Backend
 
```bash
cd backend
npm install
cp .env.example .env
```
 
Edita el archivo `.env` y agrega tu API Key:
 
```env
# backend/.env
GROQ_API_KEY=tu-api-key-aqui
PORT=3000
```
 
Inicia el servidor:
 
```bash
npm run dev
```
 
### 3. Configurar el Frontend
 
Abre una nueva terminal:
 
```bash
cd frontend
npm install
npm run dev
```
 
Abre [http://localhost:5173](http://localhost:5173) en tu navegador. 🎉
 
---
 
## 🌐 Variables de Entorno
 
| Variable | Descripción | Requerida |
|---|---|---|
| `GROQ_API_KEY` | API Key de [Groq Console](https://console.groq.com) | ✅ Sí |
| `PORT` | Puerto del servidor backend (default: `3000`) | ❌ Opcional |
 
---
 
## 📡 Cómo funciona el Streaming
 
El backend expone un endpoint `/api/chat` que utiliza **Server-Sent Events** para enviar tokens del modelo de lenguaje al frontend conforme se van generando, logrando el efecto de escritura en tiempo real sin necesidad de WebSockets.
 
```
Cliente (Vue 3)  ──POST /api/chat──►  Backend (Express)
                                            │
                                     Groq API (LLaMA 3.3)
                                            │
Cliente         ◄── SSE stream ────  tokens en tiempo real
```
 
---
 
## 📄 Licencia
 
Distribuido bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.
 
---
 
<div align="center">
 
Hecho por [Saúl Vázquez](https://github.com/SaulVaz)
 
</div>
