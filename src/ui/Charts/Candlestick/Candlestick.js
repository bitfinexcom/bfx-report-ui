import React from 'react'
import { withTranslation } from 'react-i18next'
import moment from 'moment'
import classNames from 'classnames'
import { createChart, CrosshairMode } from 'lightweight-charts'

import CandleStats from './CandleStats'
import Tooltip from './Tooltip'
import { propTypes, defaultProps } from './Candlestick.props'

class Candlestick extends React.PureComponent {
  state = {
    chart: null,
    width: null,
    height: null,
    candleSeries: null,
    tradeSeries: null,
  }

  componentDidMount() {
    const { candles, trades } = this.props

    const element = document.getElementById('candlestick')
    const width = element.offsetWidth
    const height = 500

    const chart = createChart(element, {
      width,
      height,
      layout: {
        backgroundColor: '#30404d',
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
      priceScale: {
        borderColor: 'rgba(197, 203, 206, 0.4)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.4)',
        rightOffset: 5,
        barSpacing: 15,
      },
    })

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#30404d',
      downColor: '#f05359',
      borderDownColor: '#f05359',
      borderUpColor: '#16b157',
      wickDownColor: '#f05359',
      wickUpColor: '#16b157',
    })
    candleSeries.setData(candles)

    const tradeSeries = chart.addBarSeries({
      thinBars: true,
      openVisible: false,
      downColor: '#30404d',
      upColor: '#30404d',
    })
    tradeSeries.setData(trades.map(trade => ({
      ...trade,
      open: trade,
    })))


    tradeSeries.setMarkers(trades.map(trade => ({
      time: trade.time,
      position: 'inBar',
      shape: 'circle',
      color: trade.execAmount > 0 ? '#16b157' : '#f05359',
    })))

    this.setState({
      chart,
      width,
      height,
      candleSeries,
      tradeSeries,
    })
  }

  timeFormatter = timestamp => moment.utc(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')

  render() {
    const { className, candles } = this.props
    const {
      chart,
      width,
      height,
      candleSeries,
      tradeSeries,
    } = this.state

    const classes = classNames('candlestick', className)

    return (
      <div id='candlestick' className={classes}>
        {chart && (
          <Tooltip
            chart={chart}
            width={width}
            height={height}
            tradeSeries={tradeSeries}
          />
        )}
        {chart && (
          <CandleStats
            chart={chart}
            candleSeries={candleSeries}
            defaultCandle={candles[0] || {}}
          />
        )}
      </div>
    )
  }
}

Candlestick.propTypes = propTypes
Candlestick.defaultProps = defaultProps

export default withTranslation('translations')(Candlestick)
