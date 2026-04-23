import ResultTable from './ResultTable'
import ResultChart from './ResultChart'
import './MessageBubble.css'

export default function MessageBubble({ message }) {
  const { role, content, sqlQuery, results, resultType, isLoading } = message

  return (
    <div className={`bubble-wrap ${role}`}>
      <div className={`bubble ${role} ${resultType === 'error' ? 'error' : ''}`}>
        {isLoading ? (
          <span className="thinking">Thinking…</span>
        ) : (
          <>
            <p className="bubble-text">{content}</p>

            {sqlQuery && (
              <details className="sql-details">
                <summary>View SQL Query</summary>
                <pre className="sql-pre">{sqlQuery}</pre>
              </details>
            )}

            {results && resultType === 'table' && (
              <ResultTable results={results} />
            )}

            {results && resultType === 'chart' && (
              <ResultChart results={results} />
            )}

            {results && resultType === 'scalar' && (
              <div className="scalar-value">{results.rows[0][0]}</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
