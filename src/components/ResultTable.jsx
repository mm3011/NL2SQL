import './ResultTable.css'

export default function ResultTable({ results }) {
  const { columns, rows } = results

  if (!rows || rows.length === 0) {
    return <p className="no-data">No results returned.</p>
  }

  return (
    <div className="table-wrap">
      <div className="table-scroll">
        <table className="result-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell ?? '—'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="row-count">
        {rows.length} row{rows.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
