import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../services/api'
import MessageBubble from './MessageBubble'
import './ChatPanel.css'

const SESSION_ID = crypto.randomUUID()

const WELCOME = {
  id: crypto.randomUUID(),
  role: 'assistant',
  content:
    'Hello! Ask me anything about the IMDB movie database in plain English. ' +
    'Try: "What are the top 10 highest-rated movies?" or "How many movies were released in 2020?" ' +
    'or "Which director has the most movies?"',
  sqlQuery: null,
  results: null,
  resultType: null,
}

export default function ChatPanel() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSubmit(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMsg = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      sqlQuery: null,
      results: null,
      resultType: null,
    }

    const pendingId = crypto.randomUUID()
    const pendingMsg = {
      id: pendingId,
      role: 'assistant',
      content: null,
      sqlQuery: null,
      results: null,
      resultType: null,
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMsg, pendingMsg])
    setInput('')
    setLoading(true)

    try {
      const data = await sendMessage(SESSION_ID, text)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId
            ? {
                ...m,
                isLoading: false,
                content: data.message,
                sqlQuery: data.sqlQuery ?? null,
                results: data.results ?? null,
                resultType: data.resultType ?? 'text',
              }
            : m
        )
      )
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId
            ? {
                ...m,
                isLoading: false,
                content: 'An error occurred while processing your request. Please try again.',
                resultType: 'error',
              }
            : m
        )
      )
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="chat-panel">
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="input-row" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the IMDB database..."
          disabled={loading}
          autoFocus
        />
        <button
          type="submit"
          className="send-btn"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  )
}
