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
import _isEmpty from 'lodash/isEmpty'

import SumUpTooltip from './Chart.tooltip'
import { formatChartData, getSumUpRangeValue } from '../Charts.helpers'
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
    showSum: false,
    refAreaEnd: '',
    refAreaStart: '',
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

  onMouseDown = e => {
    this.setState({
      refAreaStart: e?.activeLabel ?? '',
      refAreaEnd: e?.activeLabel ?? '',
      showSum: true,
    })
  }

  onMouseMove = e => {
    const { refAreaStart } = this.state
    if (refAreaStart) {
      this.setState({
        refAreaEnd: e?.activeLabel ?? '',
      })
    }
  }

  onMouseUp = () => {
    this.setState(() => ({
      refAreaStart: '',
      refAreaEnd: '',
      showSum: false,
    }))
  }

  render() {
    const {
      t,
      data,
      className,
      isSumUpEnabled,
    } = this.props
    const {
      showSum,
      refAreaEnd,
      refAreaStart,
    } = this.state
    const sumUpValue = getSumUpRangeValue(data, refAreaStart, refAreaEnd)
    const shouldShowReferenceArea = isSumUpEnabled && refAreaStart && refAreaEnd

    if (_isEmpty(data)) {
      return null
    }

    const classes = classNames('line-chart', className)

    return (
      <div className={classes}>
        <ResponsiveContainer aspect={4.0 / 1.8}>
          <AreaChart
            data={data}
            onMouseUp={this.onMouseUp}
            onMouseDown={isSumUpEnabled && this.onMouseDown}
            onMouseMove={refAreaStart && this.onMouseMove}
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
                  t={t}
                  sumUpValue={sumUpValue}
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
            {shouldShowReferenceArea ? (
              <ReferenceArea
                x1={refAreaStart}
                x2={refAreaEnd}
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
