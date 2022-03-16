import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import moment from 'moment'
import classNames from 'classnames'
import { createChart, CrosshairMode } from 'lightweight-charts'
import _debounce from 'lodash/debounce'

import { THEME_CLASSES } from 'utils/themes'

import IndicatorsSelect from './IndicatorsSelect'
import Indicators from './Indicators'
import CandleStats from './CandleStats'
import TradesToggle from './TradesToggle'
import Tooltip from './Tooltip'
import TradingViewLink from './TradingViewLink'
import { propTypes, defaultProps } from './Candlestick.props'

const {
  HorizontalLine,
  HorizontalLineForm,
  MovingAverage,
  MovingAverageForm,
  BollingerBand,
  BollingerBandForm,
} = Indicators

const FORMS = {
  HorizontalLine: HorizontalLineForm,
  MovingAverage: MovingAverageForm,
  BollingerBand: BollingerBandForm,
}

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
  state = {
    width: null,
    height: null,
    isTradesVisible: true,
    indicators: {},
  }

  chart = null

  candleSeries = null

  tradeSeries = null

  constructor() {
    super()

    this.onResize = _debounce(this.onResize, 100)

    this.addIndicator = this.addIndicator.bind(this) // Avoid bind in JSX onChange.
  }

  componentDidMount() {
    this.createChart()
    window.addEventListener('resize', this.onResize, true)
  }

  componentDidUpdate(prevProps) {
    const { isTradesVisible } = this.state
    const { candles, trades, theme } = this.props
    if (candles.entries !== prevProps.candles.entries) {
      this.candleSeries.setData(candles.entries)
      const { indicators } = this.state
      const indicatorsValues = Object.values(indicators)
      indicatorsValues.forEach((indicator) => {
        if (indicator.isVisible) indicator.setSeriesData(candles.entries)
      })
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
      this.cleanChartData()
    }
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.recreateChart()
  }

  createChart = () => {
    const { isTradesVisible } = this.state
    const { candles: { entries: candles }, theme } = this.props
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
    this.chart = chart

    chart.subscribeVisibleTimeRangeChange(this.onTimeRangeChange)

    this.candleSeries = chart.addCandlestickSeries({
      upColor: backgroundColor,
      downColor: '#f05359',
      borderDownColor: '#f05359',
      borderUpColor: '#16b157',
      wickDownColor: '#f05359',
      wickUpColor: '#16b157',
      lastValueVisible: false,
      priceLineVisible: false,
    })
    this.candleSeries.setData(candles)

    const { indicators } = this.state
    const indicatorsValues = Object.values(indicators)
    indicatorsValues.forEach((indicator) => {
      if (!indicator.isVisible) return
      indicator.getSeries(chart)
      indicator.setSeriesData(candles)
    })

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

    this.tradeSeries.setData(trades.map(trade => ({
      ...trade,
      open: trade,
    })))

    this.tradeSeries.setMarkers(trades.map(trade => ({
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

  addIndicator(indicator) {
    const { indicators } = this.state
    if (indicator === 'HorizontalLine') {
      const newLine = new HorizontalLine({ value: 40000 })
      const key = Date.now()
      newLine.key = key
      indicators[key] = newLine
    } else if (indicator === 'MovingAverage') {
      const newLine = new MovingAverage({ value: 24 })
      const key = Date.now()
      newLine.key = key
      indicators[key] = newLine
    } else if (indicator === 'BollingerBand') {
      const newLine = new BollingerBand({ value: 24, stdValue: 2 })
      const key = Date.now()
      newLine.key = key
      indicators[key] = newLine
    }
    this.recreateChart()
  }

  removeIndicator(key) {
    const { indicators } = this.state
    const newIndicators = { ...indicators }
    delete newIndicators[key]
    this.setState({ indicators: newIndicators }, () => this.recreateChart())
  }

  updateValue(key, event) {
    event.preventDefault() // Avoid page refresh.
    const { indicators } = this.state
    const updatedIndicators = { ...indicators }
    const { level } = event.target
    const levelValue = level.value
    updatedIndicators[key].value = +levelValue
    if (updatedIndicators[key].type === 'BollingerBand') {
      const { std } = event.target
      const stdValue = std.value
      updatedIndicators[key].stdValue = +stdValue
    }
    this.setState({ indicators: updatedIndicators }, () => this.recreateChart())
  }

  getIndicatorsStatusBar() {
    const { indicators } = this.state
    return (
      <div>
        {Object.values(indicators).map((indicator) => {
          const opts = {
            chart: this.chart,
            indicator,
            lineSeries: indicator.series,
            defaultValue: indicator.value,
            onSubmit: this.updateValue.bind(this, indicator.key),
            onClose: this.removeIndicator.bind(this, indicator.key),
          }
          if (indicator.type === 'BollingerBand') {
            opts.stdDefaultValue = indicator.stdValue
          }
          return (
            React.createElement(FORMS[indicator.type], opts)
          )
        })}
      </div>
    )
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
            <IndicatorsSelect
              value={'Indicators:'}
              onChange={this.addIndicator}
            />
            <TradingViewLink />
            {this.getIndicatorsStatusBar()}
          </Fragment>
        )}
      </div>
    )
  }
}

Candlestick.propTypes = propTypes
Candlestick.defaultProps = defaultProps

export default withTranslation('translations')(Candlestick)
