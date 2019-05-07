import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { HTMLSelect } from '@blueprintjs/core'

import timeframeConstants from './constants'

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
        <option key={timeframeConstants.DAY} value={timeframeConstants.DAY}>{t('timeframe.day')}</option>
        <option key={timeframeConstants.MONTH} value={timeframeConstants.MONTH}>{t('timeframe.month')}</option>
        <option key={timeframeConstants.YEAR} value={timeframeConstants.YEAR}>{t('timeframe.year')}</option>
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
