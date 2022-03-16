import React from 'react'
import { withTranslation } from 'react-i18next'
import _throttle from 'lodash/throttle'

import { propTypes, defaultProps } from './BollingerBandForm.props'

class BollingerBandForm extends React.PureComponent {
  constructor(props) {
    super()
    this.state = {
      indicator: props.indicator,
      lineValue: props.defaultValue,
      stdValue: props.stdDefaultValue,
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
    const lineValue = seriesPrices.get(lineSeries)

    if (!lineValue || !time) {
      return
    }

    this.setState({
      lineValue,
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
    const { lineValue, stdValue, indicator } = this.state

    return (
      <form onSubmit={onSubmit}>
        <div>
          <span>{indicator.getStatusTitle()}</span>
          <span> lgth</span>
          <input
            style={{ width: '30px' }}
            type='level'
            name='level'
            defaultValue={lineValue}
          />
          <span> std</span>
          <input
            style={{ width: '20px' }}
            type='std'
            name='std'
            defaultValue={stdValue}
          />
          <button type='submit' onClick={onClose}>X</button>
          <input type='submit' value='Ok' />
          <span>{lineValue}</span>
        </div>
      </form>
    )
  }
}

BollingerBandForm.propTypes = propTypes
BollingerBandForm.defaultProps = defaultProps

export default withTranslation('translations')(BollingerBandForm)
