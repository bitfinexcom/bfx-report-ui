import React from 'react'
import { withTranslation } from 'react-i18next'
import _throttle from 'lodash/throttle'

import { propTypes, defaultProps } from './HorizontalLineForm.props'

class HorizontalLineForm extends React.PureComponent {
  constructor(props) {
    super()
    this.state = {
      indicator: props.indicator,
      lineValue: props.defaultValue,
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
    const { lineValue, indicator } = this.state

    return (
      <form onSubmit={onSubmit}>
        <div>
          <span>{indicator.getStatusTitle()}</span>
          <input
            style={{ width: '50px' }}
            type='level'
            name='level'
            defaultValue={lineValue}
          />
          <button type='submit' onClick={onClose}>X</button>
          <input type='submit' value='Ok' />
          <span>{lineValue}</span>
        </div>
      </form>
    )
  }
}

HorizontalLineForm.propTypes = propTypes
HorizontalLineForm.defaultProps = defaultProps

export default withTranslation('translations')(HorizontalLineForm)
