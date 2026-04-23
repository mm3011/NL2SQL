import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import './ResultChart.css'

export default function ResultChart({ results }) {
  const { columns, rows } = results

  if (!rows || rows.length === 0) {
    return <p className="no-data">No data to display.</p>
  }

  const labelKey = columns[0]
  const valueKey = columns[1]

  const data = rows.map((row) => ({
    [labelKey]: String(row[0]),
    [valueKey]: row[1],
  }))

  return (
    <div className="chart-wrap">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 12, left: 0, bottom: 48 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#efefef" />
          <XAxis
            dataKey={labelKey}
            tick={{ fontSize: 11 }}
            angle={-30}
            textAnchor="end"
            interval={0}
          />
          <YAxis tick={{ fontSize: 11 }} width={50} />
          <Tooltip
            contentStyle={{ fontSize: 12, border: '1px solid #ddd' }}
          />
          <Bar dataKey={valueKey} fill="#444" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
