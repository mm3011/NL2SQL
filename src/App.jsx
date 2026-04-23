import SchemaPanel from './components/SchemaPanel'
import ChatPanel from './components/ChatPanel'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <strong>NL2SQL</strong>
        <span>Natural Language to SQL — IMDB Movie Database</span>
      </header>
      <div className="app-layout">
        <SchemaPanel />
        <ChatPanel />
      </div>
    </div>
  )
}
