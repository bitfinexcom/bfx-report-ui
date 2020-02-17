import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import moment from 'moment'
import classNames from 'classnames'
import { createChart, CrosshairMode } from 'lightweight-charts'

import { THEME_CLASSES } from 'utils/themes'

import CandleStats from './CandleStats'
import TradesToggle from './TradesToggle'
import Tooltip from './Tooltip'
import TradingViewLink from './TradingViewLink'
import { propTypes, defaultProps } from './Candlestick.props'

const STYLES = {
  [THEME_CLASSES.DARK]: {
    backgroundColor: '#30404d',
    volumeColor: 'rgb(97,107,115)',
  },
  [THEME_CLASSES.LIGHT]: {
    backgroundColor: '#ffffff',
    volumeColor: 'rgb(165,176,185)',
  },
}

const SCROLL_THRESHOLD = 200

class Candlestick extends React.PureComponent {
  state = {
    width: null,
    height: null,
    isTradesVisible: true,
  }

  chart = null

  candleSeries = null

  tradeSeries = null

  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate(prevProps) {
    const { isTradesVisible } = this.state
    const { candles, trades, theme } = this.props
    if (candles.entries !== prevProps.candles.entries) {
      this.candleSeries.setData(candles.entries)
    }
    if (trades.entries !== prevProps.trades.entries && isTradesVisible) {
      this.setTradeSeries()
    }

    if (theme !== prevProps.theme) {
      this.recreateChart()
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.unsubscribeVisibleTimeRangeChange(this.onTimeRangeChange)
      this.chart.remove()
    }
  }

  createChart = () => {
    const { isTradesVisible } = this.state
    const { candles: { entries: candles }, theme } = this.props
    const { backgroundColor } = STYLES[theme]

    const element = document.getElementById('candlestick')
    const width = element.offsetWidth
    const height = 500

    const chart = createChart(element, {
      width,
      height,
      layout: {
        backgroundColor,
        textColor: 'rgba(255, 255, 255, 0.5)',
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
    }

    this.tradeSeries.setData(trades.map(trade => ({
      ...trade,
      open: trade,
    })))

    this.tradeSeries.setMarkers(trades.map(trade => ({
      time: trade.time,
      position: 'inBar',
      shape: 'circle',
      color: trade.execAmount > 0 ? '#16b157' : '#f05359',
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
    const { candles, trades, fetchData } = this.props

    const candleScrollTime = candles.entries[SCROLL_THRESHOLD] && candles.entries[SCROLL_THRESHOLD].time
    if (candles.nextPage && !candles.isLoading && from < candleScrollTime) {
      fetchData('candles')
    }

    const tradeScrollTime = trades.entries[SCROLL_THRESHOLD] && trades.entries[SCROLL_THRESHOLD].time
    if (trades.nextPage && !trades.isLoading && from < tradeScrollTime) {
      fetchData('trades')
    }
  }

  recreateChart = () => {
    if (!this.chart) {
      return
    }

    this.chart.unsubscribeVisibleTimeRangeChange(this.onTimeRangeChange)
    this.chart.remove()
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
    const { className, candles: { entries: candles } } = this.props
    const {
      width,
      height,
      isTradesVisible,
    } = this.state

    const classes = classNames('candlestick', className)

    return (
      <div id='candlestick' className={classes}>
        {this.chart && (
          <Fragment>
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
          </Fragment>
        )}
      </div>
    )
  }
}

Candlestick.propTypes = propTypes
Candlestick.defaultProps = defaultProps

export default withTranslation('translations')(Candlestick)
