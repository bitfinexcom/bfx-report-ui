import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { HTMLSelect } from '@blueprintjs/core'

const TIMEFRAMES = [
  'day',
  'month',
  'year',
]

class TimeframeSelector extends PureComponent {
  onChange = (e) => {
    const { target: { value } } = e
    const { onTimeframeSelect } = this.props
    onTimeframeSelect(value)
  }

  render() {
    const { currentTimeframe, t } = this.props

    return (
      <HTMLSelect
        value={currentTimeframe}
        onChange={this.onChange}
      >
        {TIMEFRAMES.map(timeframe => <option key={timeframe} value={timeframe}>{t(`timeframe.${timeframe}`)}</option>)}
      </HTMLSelect>
    )
  }
}

TimeframeSelector.propTypes = {
  currentTimeframe: PropTypes.string.isRequired,
  onTimeframeSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
TimeframeSelector.defaultProps = {}

export default withTranslation('translations')(TimeframeSelector)
