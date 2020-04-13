import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  PieChart as SimplePieChart, Pie, Legend, Cell,
} from 'recharts'

const COLORS = [
  '#8a36d8',
  '#FF3333',
  '#00ab00',
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#2f2fff',
  '#7b1010',
  '#76818c',
  '#205050',
]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = (props) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, percent,
  } = props

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  const percentValue = (percent * 100).toFixed(0)

  // don't show percentage for low values
  if (percentValue < 3) {
    return null
  }

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${percentValue}%`}
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
  getColor = (index) => {
    const { data } = this.props

    // if number of items is exactly one more than number of defined colors - skip first color
    if ((data.length - COLORS.length === 1) && index === COLORS.length) {
      return COLORS[1]
    }

    return COLORS[index % COLORS.length]
  }

  render() {
    const { data } = this.props

    return (
      <SimplePieChart width={282} height={320}>
        <Pie
          data={data}
          dataKey='value'
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}

        >
          {data.map((entry, index) => <Cell key={entry.name} fill={this.getColor(index)} />)}
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
