import React from 'react'
import { withTranslation } from 'react-i18next'
import _throttle from 'lodash/throttle'

import { propTypes, defaultProps } from './CandleStats.props'

class CandleStats extends React.PureComponent {
  constructor(props) {
    super()

    this.state = {
      candle: props.defaultCandle,
    }
    this.onCrosshairMove = _throttle(this.onCrosshairMove, 5)
  }

  componentDidMount() {
    const { chart } = this.props
    chart.subscribeCrosshairMove(this.onCrosshairMove)
  }

  componentDidUpdate(prevProps) {
    const { chart } = this.props
    if (chart !== prevProps.chart) {
      prevProps.chart.unsubscribeCrosshairMove(this.onCrosshairMove)
      chart.subscribeCrosshairMove(this.onCrosshairMove)
    }
  }

  componentWillUnmount() {
    const { chart } = this.props
    chart.unsubscribeCrosshairMove(this.onCrosshairMove)
  }

  onCrosshairMove = (param) => {
    const { candleSeries } = this.props
    const { time, seriesPrices } = param
    const candle = seriesPrices.get(candleSeries)

    if (!candle || !time) {
      return
    }

    this.setState({
      candle,
    })
  }

  getCandleStat = (pref, val = 0, valueClass) => (
    <span className='candlestick-candle-stat'>
      <span className='bitfinex-show-soft'>{`${pref} `}</span>
      <span className={valueClass}>{val.toFixed(1)}</span>
    </span>
  )

  render() {
    const { candle } = this.state
    const {
      open = 0, high = 0, low = 0, close = 0,
    } = candle

    const candleValueClass = close < open
      ? 'candlestick-candle-stat--red'
      : 'candlestick-candle-stat--green'

    return (
      <div className='candlestick-candle'>
        {this.getCandleStat('O', open, candleValueClass)}
        {this.getCandleStat('H', high, candleValueClass)}
        {this.getCandleStat('L', low, candleValueClass)}
        {this.getCandleStat('C', close, candleValueClass)}
      </div>
    )
  }
}

CandleStats.propTypes = propTypes
CandleStats.defaultProps = defaultProps

export default withTranslation('translations')(CandleStats)
