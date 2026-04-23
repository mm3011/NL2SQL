import { useState, useEffect } from 'react'
import { fetchSchema } from '../services/api'
import './SchemaPanel.css'

export default function SchemaPanel() {
  const [schema, setSchema] = useState(null)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState({})

  useEffect(() => {
    fetchSchema()
      .then(setSchema)
      .catch((err) => setError(err.message))
  }, [])

  function toggle(name) {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <aside className="schema-panel">
      <div className="schema-heading">Database Schema</div>

      {!schema && !error && (
        <div className="schema-status">Loading schema…</div>
      )}

      {error && (
        <div className="schema-error">
          <p>Failed to load schema.</p>
          <p className="schema-error-detail">{error}</p>
        </div>
      )}

      {schema && (
        <div className="schema-tables">
          {schema.tables.map((table) => (
            <div key={table.name} className="schema-table">
              <button className="table-toggle" onClick={() => toggle(table.name)}>
                <span className="arrow">{expanded[table.name] ? '▾' : '▸'}</span>
                {table.name}
              </button>
              {expanded[table.name] && (
                <ul className="column-list">
                  {table.columns.map((col) => (
                    <li key={col.name} className="column-item">
                      <span className="col-name">{col.name}</span>
                      <span className="col-type">{col.type}</span>
                      {col.pk && <span className="badge pk">PK</span>}
                      {col.fk && <span className="badge fk">FK</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}
