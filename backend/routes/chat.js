import { Router } from 'express'
import Groq from 'groq-sdk'

const router = Router()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post('/', async (req, res) => {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages es requerido' })
  }

  try {
    const validMessages = messages
      .filter(m => m.content && m.content.trim())
      .map(m => ({ role: m.role, content: m.content }))

    // Headers para Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,  // activar streaming
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente de IA útil y amigable. Responde siempre en español a menos que el usuario escriba en otro idioma.'
        },
        ...validMessages
      ]
    })

    // Enviar cada token al frontend conforme llega
    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || ''
      if (token) {
        res.write(`data: ${JSON.stringify({ token })}\n\n`)
      }
    }

    // Señal de fin del stream
    res.write('data: [DONE]\n\n')
    res.end()

  } catch (err) {
    console.error('Groq streaming error:', err.message)
    res.status(500).json({ error: 'Error en el servidor' })
  }
})

export default router