import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  PieChart as SimplePieChart, Pie, Legend, Cell,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = (props) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, percent,
  } = props

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

renderCustomizedLabel.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  midAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
}

class PieChart extends PureComponent {
  render() {
    const { data } = this.props

    return (
      <SimplePieChart width={322} height={360}>
        <Pie
          data={data}
          dataKey='value'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={160}

        >
          {data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Legend verticalAlign='top' wrapperStyle={{ paddingBottom: 15 }} />
      </SimplePieChart>
    )
  }
}

const PIE_ENTRIES_PROPS = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
})

PieChart.propTypes = {
  data: PropTypes.arrayOf(PIE_ENTRIES_PROPS).isRequired,
}

PieChart.defaultProps = {}

export default PieChart
