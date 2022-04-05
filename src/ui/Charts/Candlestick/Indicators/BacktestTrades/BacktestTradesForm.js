import React from 'react'
import { withTranslation } from 'react-i18next'
import _throttle from 'lodash/throttle'

import { propTypes, defaultProps } from './BacktestTradesForm.props'

class BacktestTradesForm extends React.PureComponent {
  constructor(props) {
    super()
    this.state = {
      indicator: props.indicator,
      trade: {
        mtsCreate: 0,
        execPrice: 0,
        maker: true,
      },
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
    const { lineSeries } = this.props
    const { time, seriesPrices } = param
    const trade = seriesPrices.get(lineSeries)

    if (!trade || !time) {
      return
    }

    this.setState({
      trade: trade.open,
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

  render() {
    const { onSubmit, onClose } = this.props
    const { indicator, trade } = this.state
    const { mtsCreate, execPrice, maker } = trade

    return (
      <form onSubmit={onSubmit}>
        <div>
          <span>{indicator.getStatusTitle()}</span>
          <span>
            {` price: ${execPrice} - mts: ${mtsCreate} - maker: ${maker}`}
          </span>
          <button type='submit' onClick={onClose}>X</button>
        </div>
      </form>
    )
  }
}

BacktestTradesForm.propTypes = propTypes
BacktestTradesForm.defaultProps = defaultProps

export default withTranslation('translations')(BacktestTradesForm)
