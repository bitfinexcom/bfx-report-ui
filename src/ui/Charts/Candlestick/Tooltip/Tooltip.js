import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import _throttle from 'lodash/throttle'

import { formatAmount } from 'ui/utils'

import { propTypes, defaultProps } from './Tooltip.props'

const tooltipWidth = 150
const tooltipHeight = 78
const tooltipMargin = 15

class Tooltip extends React.PureComponent {
  state = {
    trade: undefined,
  }

  constructor() {
    super()

    this.onCrosshairMove = _throttle(this.onCrosshairMove, 5)
  }

  componentDidMount() {
    const { chart } = this.props
    chart.subscribeCrosshairMove(this.onCrosshairMove)
  }

  onCrosshairMove = (param) => {
    const {
      width,
      height,
      tradeSeries,
      // candleSeries,
    } = this.props
    const { time, point = {}, seriesPrices } = param
    const trade = seriesPrices.get(tradeSeries)

    const tooltip = document.getElementsByClassName('candlestick-tooltip')[0]

    const { x, y } = point
    if (!trade || !time || x < 0 || x > width || y < 0 || y > height) {
      tooltip.style.display = 'none'
      return
    }

    tooltip.style.display = 'block'
    tooltip.style.borderColor = trade.open.execAmount > 0 ? '#16b157' : '#f05359'
    // const candle = seriesPrices.get(candleSeries)

    if (trade) {
      this.setState({
        trade: trade.open,
      })
    }

    this.setOffset(tooltip, point)
  }

  /* eslint-disable no-param-reassign */
  setOffset = (tooltip, point) => {
    const { width, height } = this.props
    const { x, y } = point

    let left = x + tooltipMargin
    if (left > width - tooltipWidth) {
      left = x - tooltipMargin - tooltipWidth
    }

    let top = y + tooltipMargin
    if (top > height - tooltipHeight) {
      top = y - tooltipHeight - tooltipMargin
    }

    tooltip.style.left = `${left}px`
    tooltip.style.top = `${top}px`
  }

  getTradeData = () => {
    const { t } = this.props
    const { trade = {} } = this.state
    const {
      execAmount = 0,
      execPrice = 0,
      orderID,
      fee,
      feeCurrency,
    } = trade

    return (
      <Fragment>
        {`Price: ${execPrice.toFixed(2)}`}
        <br />
        {`${t('candles.amount')}: `}
        {formatAmount(execAmount)}
        <br />
        {`${t('candles.orderid')}: ${orderID}`}
        <br />
        {`${t('candles.fee')}: `}
        {formatAmount(fee)}
        {' '}
        <span className='bitfinex-show-soft'>
          {feeCurrency}
        </span>
      </Fragment>
    )
  }

  render() {
    const { trade } = this.state

    return (
      <div className='candlestick-tooltip'>
        {trade && this.getTradeData()}
      </div>
    )
  }
}

Tooltip.propTypes = propTypes
Tooltip.defaultProps = defaultProps

export default withTranslation('translations')(Tooltip)
