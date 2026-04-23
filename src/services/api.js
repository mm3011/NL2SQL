const CHAT_URL = import.meta.env.VITE_CHAT_LAMBDA_URL
const SCHEMA_URL = import.meta.env.VITE_SCHEMA_LAMBDA_URL

export async function sendMessage(sessionId, message) {
  if (!CHAT_URL) {
    throw new Error('VITE_CHAT_LAMBDA_URL is not configured in .env')
  }

  const res = await fetch(CHAT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function fetchSchema() {
  if (!SCHEMA_URL) {
    throw new Error('VITE_SCHEMA_LAMBDA_URL is not configured in .env')
  }

  const res = await fetch(SCHEMA_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
