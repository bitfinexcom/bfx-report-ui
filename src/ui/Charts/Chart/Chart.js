import React from 'react'
import classNames from 'classnames'
import { withTranslation } from 'react-i18next'
import {
  Area,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts'
import _head from 'lodash/head'
import _isEmpty from 'lodash/isEmpty'

import SumUpTooltip from './Chart.tooltip'
import { formatChartData } from '../Charts.helpers'
import { propTypes, defaultProps } from './Chart.props'

const COLORS = [
  '#73c7ff',
  '#0e9803',
  '#d4d400',
  '#ff2727',
]

class Chart extends React.PureComponent {
  state = {
    hiddenKeys: {},
    refAreaLeft: '',
    refAreaRight: '',
    startValue: null,
    endValue: null,
    showSum: false,
  }

  getGradients = () => {
    const { dataKeys } = this.props

    return dataKeys.map((dataKey, i) => {
      const { key = dataKey } = dataKey

      return (
        <linearGradient key={key} id={key} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor={COLORS[i]} stopOpacity={0.15} />
          <stop offset='100%' stopColor={COLORS[i]} stopOpacity={0.06} />
        </linearGradient>
      )
    })
  }

  getAreas = () => {
    const { hiddenKeys } = this.state
    const { dataKeys } = this.props

    return dataKeys.map((dataKey, i) => {
      const { key = dataKey, name } = dataKey

      return (
        <Area
          key={key}
          name={name}
          dot={false}
          connectNulls
          dataKey={key}
          type='monotone'
          strokeWidth={1.2}
          fill={`url(#${key})`}
          stroke={COLORS[i]}
          hide={hiddenKeys[key]}
        />
      )
    })
  }

  onLegendClick = ({ dataKey }) => {
    this.setState(({ hiddenKeys }) => ({
      hiddenKeys: {
        ...hiddenKeys,
        [dataKey]: !hiddenKeys[dataKey],
      },
    }))
  }

  onMouseDown = ({ activeLabel = '', activePayload }) => {
    const { value = null } = _head(activePayload)
    this.setState({
      refAreaLeft: activeLabel,
      startValue: +value,
      showSum: true,
    })
  }

  onMouseMove = ({ activeLabel = '', activePayload }) => {
    const { refAreaLeft } = this.state
    const { value = null } = _head(activePayload)
    if (refAreaLeft) {
      this.setState({
        refAreaRight: activeLabel,
        endValue: +value,
      })
    }
  }

  onMouseUp = () => {
    const { refAreaLeft, refAreaRight } = this.state
    // const { data } = this.state

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
        showSum: false,
        startValue: null,
        endValue: null,
      }))
      return
    }

    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      showSum: false,
      startValue: null,
      endValue: null,
    }))
  }

  render() {
    const { data, className } = this.props
    const {
      refAreaLeft,
      refAreaRight,
      showSum,
      startValue,
      endValue,
    } = this.state

    if (_isEmpty(data)) {
      return null
    }

    const classes = classNames('line-chart', className)

    return (
      <div className={classes}>
        <ResponsiveContainer aspect={4.0 / 1.8}>
          <AreaChart
            data={data}
            onMouseDown={this.onMouseDown}
            onMouseMove={refAreaLeft && this.onMouseMove}
            onMouseUp={this.onMouseUp}
          >
            <defs>
              {this.getGradients()}
            </defs>
            <XAxis
              dataKey='name'
              stroke='#9e9494'
            />
            <YAxis
              width={90}
              stroke='#9e9494'
              tickFormatter={formatChartData}
            />
            <Tooltip
              isAnimationActive={false}
              formatter={formatChartData}
              content={showSum && (
                <SumUpTooltip
                  startValue={startValue}
                  endValue={endValue}
                />
              )}
            />
            <CartesianGrid
              stroke='#57636b'
              strokeDasharray='3 3'
            />
            <Legend
              iconType='rect'
              verticalAlign='top'
              onClick={this.onLegendClick}
              wrapperStyle={{ paddingBottom: 15 }}
            />
            {this.getAreas()}
            {refAreaLeft && refAreaRight ? (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

Chart.propTypes = propTypes
Chart.defaultProps = defaultProps

export default withTranslation('translations')(Chart)
