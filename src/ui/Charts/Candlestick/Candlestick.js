import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import { createChart, CrosshairMode } from 'lightweight-charts'
import _isEqual from 'lodash/isEqual'
import _debounce from 'lodash/debounce'

import { THEME_CLASSES } from 'utils/themes'
import { getPriceFormat, mergeSimilarTrades } from '../Charts.helpers'

import Tooltip from './Tooltip'
import CandleStats from './CandleStats'
import TradesToggle from './TradesToggle'
import TradingViewLink from './TradingViewLink'

const STYLES = {
  [THEME_CLASSES.DARK]: {
    backgroundColor: '#102331',
    textColor: 'rgba(255, 255, 255, 0.5)',
    volumeColor: 'rgb(97,107,115)',
  },
  [THEME_CLASSES.LIGHT]: {
    backgroundColor: '#ffffff',
    textColor: 'rgba(0, 0, 0, 0.6)',
    volumeColor: 'rgb(165,176,185)',
  },
}

const SCROLL_THRESHOLD = 200

class Candlestick extends React.PureComponent {
  static propTypes = {
    candles: PropTypes.shape({
      entries: PropTypes.arrayOf(PropTypes.shape({
        time: PropTypes.number,
        open: PropTypes.number,
        close: PropTypes.number,
        high: PropTypes.number,
        low: PropTypes.number,
        volume: PropTypes.number,
      })),
      isLoading: PropTypes.bool.isRequired,
      nextPage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    }),
    chartScrollTime: PropTypes.number,
    className: PropTypes.string,
    fetchData: PropTypes.func.isRequired,
    handleChartScrollTime: PropTypes.func,
    setChartScrollTime: PropTypes.func,
    isGoToRangePreserved: PropTypes.bool,
    timeRange: PropTypes.shape({
      start: PropTypes.number,
      end: PropTypes.number,
    }),
    trades: PropTypes.shape({
      entries: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        time: PropTypes.number,
        execAmount: PropTypes.number,
        execPrice: PropTypes.number,
        fee: PropTypes.number,
        feeCurrency: PropTypes.string,
        mtsCreate: PropTypes.number,
        orderID: PropTypes.number,
      })),
      isLoading: PropTypes.bool.isRequired,
      nextPage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    }),
    setGoToRangePreserve: PropTypes.func,
    theme: PropTypes.string.isRequired,
  }

  static defaultProps = {
    candles: {},
    chartScrollTime: undefined,
    className: undefined,
    handleChartScrollTime: () => {},
    isGoToRangePreserved: false,
    timeRange: {},
    trades: {},
    setChartScrollTime: () => {},
    setGoToRangePreserve: () => {},
  }

  state = {
    width: null,
    height: null,
    isTradesVisible: true,
  }

  chart = null

  candleSeries = null

  tradeSeries = null

  constructor() {
    super()

    this.onResize = _debounce(this.onResize, 100)
  }

  componentDidMount() {
    this.createChart()
    window.addEventListener('resize', this.onResize, true)
  }

  componentDidUpdate(prevProps) {
    const { isTradesVisible } = this.state
    const {
      candles,
      chartScrollTime,
      handleChartScrollTime,
      isGoToRangePreserved,
      theme,
      timeRange,
      trades,
    } = this.props
    if (candles?.entries !== prevProps?.candles?.entries) {
      this.candleSeries.setData(candles.entries)
    }
    if (trades?.entries !== prevProps?.trades?.entries && isTradesVisible) {
      this.setTradeSeries()
    }
    if (theme !== prevProps?.theme) {
      this.recreateChart()
    }
    if (isGoToRangePreserved && !_isEqual(timeRange, prevProps?.timeRange)) {
      this.recreateChart()
    }
    if (!_isEqual(prevProps?.chartScrollTime, chartScrollTime)) {
      handleChartScrollTime({
        currentScrollTime: (chartScrollTime * 1000),
      })
    }
  }

  componentWillUnmount() {
    const {
      isGoToRangePreserved,
      setGoToRangePreserve,
    } = this.props
    if (this.chart) {
      this.cleanChartData()
    }
    if (isGoToRangePreserved) setGoToRangePreserve(false)
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.recreateChart()
  }

  createChart = () => {
    const { isTradesVisible } = this.state
    const {
      candles: { entries: candles }, theme, timeRange, isGoToRangePreserved,
    } = this.props
    const { backgroundColor, textColor } = STYLES[theme]

    const element = document.getElementById('candlestick')
    const width = element.offsetWidth
    let height = 520
    if (window.innerHeight <= 812) {
      height = 420
    }
    if (window.innerHeight >= 1440) {
      height = 850
    }

    const chart = createChart(element, {
      width,
      height,
      layout: {
        backgroundColor,
        textColor,
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.2)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.2)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      localization: {
        timeFormatter: this.timeFormatter,
      },
      priceScale: [{
        borderColor: 'rgba(197, 203, 206, 0.4)',
        autoScale: true,
      }],
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.4)',
        rightOffset: 3,
        barSpacing: 15,
      },
    })

    const priceFormat = getPriceFormat(candles)

    chart.addLineSeries({ priceFormat })

    const { start, end } = timeRange

    if (isGoToRangePreserved) {
      chart.timeScale().setVisibleRange({
        from: start / 1000,
        to: end / 1000,
      })
    }

    this.chart = chart

    chart.subscribeVisibleTimeRangeChange(this.onTimeRangeChange)

    this.candleSeries = chart.addCandlestickSeries({
      upColor: backgroundColor,
      downColor: '#f05359',
      borderDownColor: '#f05359',
      borderUpColor: '#16b157',
      wickDownColor: '#f05359',
      wickUpColor: '#16b157',
    })
    this.candleSeries.setData(candles)

    this.setState({
      width,
      height,
    })

    this.setVolumeSeries()
    if (isTradesVisible) {
      this.setTradeSeries()
    }
  }

  setTradeSeries = () => {
    const { trades: { entries: trades }, theme } = this.props
    const { backgroundColor } = STYLES[theme]

    if (!this.tradeSeries) {
      this.tradeSeries = this.chart.addBarSeries({
        thinBars: true,
        openVisible: true,
        downColor: backgroundColor,
        upColor: backgroundColor,
      })
      this.forceUpdate()
    }

    const preparedTrades = mergeSimilarTrades(trades)

    this.tradeSeries.setData(preparedTrades.map(trade => ({
      ...trade,
      open: trade,
    })))

    this.tradeSeries.setMarkers(preparedTrades.map(trade => ({
      time: trade.time,
      position: 'inBar',
      shape: 'circle',
      color: trade.execAmount > 0 ? '#1eb150' : '#f0403f',
    })))
  }

  setVolumeSeries = () => {
    const { candles: { entries: candles }, theme } = this.props
    const { volumeColor } = STYLES[theme]

    if (!this.volumeSeries) {
      this.volumeSeries = this.chart.addHistogramSeries({
        color: '#26a69a',
        lineWidth: 2,
        priceFormat: {
          type: 'volume',
        },
        overlay: true,
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      })
    }

    this.volumeSeries.setData(candles.map(candle => ({
      time: candle.time,
      value: candle.volume,
      color: volumeColor,
    })))
  }

  onTimeRangeChange = ({ from }) => {
    const {
      candles, trades, fetchData, setChartScrollTime,
    } = this.props
    setChartScrollTime(from)
    const candleScrollTime = candles.entries[SCROLL_THRESHOLD] && candles.entries[SCROLL_THRESHOLD].time
    if (candles.nextPage && !candles.isLoading && from < candleScrollTime) {
      fetchData('candles')
    }

    const tradeScrollTime = trades.entries[SCROLL_THRESHOLD] && trades.entries[SCROLL_THRESHOLD].time
    if (trades.nextPage && !trades.isLoading && from < tradeScrollTime) {
      fetchData('trades')
    }
  }

  cleanChartData = () => {
    this.chart.unsubscribeVisibleTimeRangeChange(this.onTimeRangeChange)
    this.chart.remove()

    this.candleSeries = null
    this.tradeSeries = null
    this.volumeSeries = null
  }

  recreateChart = () => {
    if (!this.chart) {
      return
    }

    this.cleanChartData()
    this.createChart()
  }

  timeFormatter = timestamp => moment.utc(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')

  onTradesVisibilityChange = (isTradesVisible) => {
    const { candles: { entries: candles } } = this.props
    this.setState({ isTradesVisible }, () => {
      if (isTradesVisible) {
        this.setTradeSeries()
      } else {
        this.chart.removeSeries(this.tradeSeries)
        this.tradeSeries = null
        this.candleSeries.setData(candles)
        this.setVolumeSeries()
      }
    })
  }

  render() {
    const {
      candles: { entries: candles },
      className,
    } = this.props
    const {
      width,
      height,
      isTradesVisible,
    } = this.state
    const classes = classNames('candlestick', className)

    return (
      <div id='candlestick' className={classes}>
        {this.chart && (
          <>
            {this.tradeSeries && (
              <Tooltip
                chart={this.chart}
                width={width}
                height={height}
                tradeSeries={this.tradeSeries}
              />
            )}
            {this.candleSeries && candles.length > 0 && (
              <CandleStats
                chart={this.chart}
                candleSeries={this.candleSeries}
                defaultCandle={candles[candles.length - 1] || {}}
              />
            )}
            <TradesToggle
              value={isTradesVisible}
              onChange={this.onTradesVisibilityChange}
            />
            <TradingViewLink />
          </>
        )}
      </div>
    )
  }
}

export default Candlestick
