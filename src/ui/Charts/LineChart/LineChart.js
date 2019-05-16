import React from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  ResponsiveContainer, LineChart as Chart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend,
} from 'recharts'

import { propTypes, defaultProps } from './LineChart.props'

const COLORS = [
  '#73c7ff',
  '#0e9803',
  '#d4d400',
  '#ff2727',
]

class LineChart extends React.PureComponent {
  getLines = () => {
    const { dataKeys } = this.props

    return dataKeys.map((key, i) => {
      const { dataKey = key, name } = key

      return (
        <Line
          key={dataKey}
          name={name}
          type='monotone'
          dataKey={dataKey}
          stroke={COLORS[i]}
          strokeWidth={1.2}
          connectNulls
          dot={false}
        />
      )
    })
  }

  render() {
    const { data, className } = this.props

    if (!data.length) {
      return null
    }

    const classes = classNames('line-chart', className)

    return (
      <div className={classes}>
        <ResponsiveContainer aspect={4.0 / 1.8}>
          <Chart
            data={data}
          >
            <XAxis dataKey='name' stroke='#9e9494' />
            <YAxis stroke='#9e9494' />
            <Tooltip animationDuration={150} />
            <CartesianGrid stroke='#57636b' strokeDasharray='3 3' />
            <Legend verticalAlign='top' wrapperStyle={{ paddingBottom: 15 }} iconType='rect' />
            {this.getLines()}
          </Chart>
        </ResponsiveContainer>
      </div>
    )
  }
}

LineChart.propTypes = propTypes
LineChart.defaultProps = defaultProps

export default withTranslation('translations')(LineChart)
