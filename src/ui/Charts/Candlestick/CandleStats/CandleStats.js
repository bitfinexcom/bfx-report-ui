import React from 'react'
import PropTypes from 'prop-types'
import _throttle from 'lodash/throttle'

class CandleStats extends React.PureComponent {
  static propTypes = {
    chart: PropTypes.objectOf(PropTypes.object),
    candleSeries: PropTypes.objectOf(PropTypes.object),
    defaultCandle: PropTypes.objectOf(PropTypes.number),
  }

  static defaultProps = {
    chart: {},
    candleSeries: {},
    defaultCandle: {},
  }

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

  formatValue = (val) => {
    if (val >= 1) {
      return val.toFixed(1)
    }

    if (val >= 0.1) {
      return val.toFixed(2)
    }

    if (val >= 0.01) {
      return val.toFixed(3)
    }

    return val
  }

  getCandleStat = (pref, val, valueClass) => (
    <span className='candlestick-candle-stat'>
      <span className='bitfinex-show-soft'>{`${pref} `}</span>
      <span className={valueClass}>{this.formatValue(val)}</span>
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

export default CandleStats
