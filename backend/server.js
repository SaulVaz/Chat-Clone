import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import chatRoute from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/chat', chatRoute)

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(` Backend corriendo en http://localhost:${PORT}`)
  if (!process.env.GROQ_API_KEY) {
  console.warn('  GROQ_API_KEY no está configurada en .env')
  }
})