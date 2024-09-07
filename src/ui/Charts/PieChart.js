import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  PieChart as SimplePieChart, Pie, Legend, Cell,
} from 'recharts'

const testData = [
  {
    name: 'BTC',
    value: 34.13116728,
  },
  {
    name: 'LN-BTC',
    value: 2.69066532,
  },
  {
    name: 'ZEC',
    value: 0.612238568,
  },
  {
    name: 'SOL',
    value: 0.4284770967,
  },
  {
    name: 'LUNA2',
    value: 0.3158846987747,
  },
  {
    name: 'AVAX',
    value: 0.25771596661999996,
  },
  {
    name: 'OMG',
    value: 0.102529873789,
  },
  {
    name: 'UNI',
    value: 0.0873126,
  },
  {
    name: 'MKR',
    value: 0.062973,
  },
  {
    name: 'BTC',
    value: 34.13116728,
  },
  {
    name: 'LN-BTC',
    value: 2.69066532,
  },
  {
    name: 'ZEC',
    value: 0.612238568,
  },
  {
    name: 'SOL',
    value: 0.4284770967,
  },
  {
    name: 'LUNA2',
    value: 0.3158846987747,
  },
  {
    name: 'AVAX',
    value: 0.25771596661999996,
  },
  {
    name: 'OMG',
    value: 0.102529873789,
  },
  {
    name: 'UNI',
    value: 0.0873126,
  },
  {
    name: 'MKR',
    value: 0.062973,
  },
  {
    name: 'LN-BTC',
    value: 2.69066532,
  },
  {
    name: 'LN-BTC',
    value: 2.69066532,
  }, {
    name: 'LN-BTC',
    value: 2.69066532,
  }, {
    name: 'LN-BTC',
    value: 2.69066532,
  }, {
    name: 'LN-BTC',
    value: 2.69066532,
  }, {
    name: 'LN-BTC',
    value: 2.69066532,
  }, {
    name: 'LN-BTC',
    value: 2.69066532,
  }, {
    name: 'LN-BTC',
    value: 2.69066532,
  },
]

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

  getChartHeight = () => {
    const { data } = this.props
    // base height + 18px for each 4 items row
    return 340 + data?.length / 4 * 18
  }

  render() {
    const { data } = this.props

    return (
      <SimplePieChart
        width={282}
        height={this.getChartHeight()}
      >
        <Pie
          data={data}
          dataKey='value'
          labelLine={false}
          outerRadius={140}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => <Cell key={entry.name} fill={this.getColor(index)} />)}
        </Pie>
        <Legend
          verticalAlign='top'
          wrapperStyle={{ paddingBottom: 15 }}
        />
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
