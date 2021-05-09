import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import _memoize from 'lodash/memoize'

import Select from 'ui/Select'
import timeRangeTypes from 'state/timeRange/constants'

import { propTypes } from './TimeRangeSelect.props'

const {
  LAST_24HOURS,
  LAST_2WEEKS,
  PAST_MONTH,
  PAST_3MONTH,
  PAST_YEAR,
  PAST_2YEARS,
  CURRENT_YEAR,
  LAST_YEAR,
  CUSTOM,
} = timeRangeTypes

class TimeRangeSelect extends PureComponent {
  constructor() {
    super()

    this.getItems = _memoize(this.getItems)
  }

  getItems = (t) => {
    const today = new Date()

    return [
      { value: LAST_24HOURS, label: t('timeframe.24h') },
      { value: LAST_2WEEKS, label: t('timeframe.2w') },
      { value: PAST_MONTH, label: t('timeframe.past_month') },
      { value: PAST_3MONTH, label: t('timeframe.past_3m') },
      { value: PAST_YEAR, label: t('timeframe.past_year') },
      { value: PAST_2YEARS, label: t('timeframe.past_2y') },
      { value: CURRENT_YEAR, label: t('timeframe.custom_year', { year: today.getFullYear() }) },
      { value: LAST_YEAR, label: t('timeframe.custom_year', { year: today.getFullYear() - 1 }) },
      { value: CUSTOM, label: t('timeframe.custom_time') },
    ]
  }

  render() {
    const { onChange, range, t } = this.props

    const items = this.getItems(t)

    return (
      <div className='preferences-row preferences-item'>
        <div>{t('timeframe.query_range')}</div>
        <Select
          className='time-range-select'
          items={items}
          onChange={onChange}
          value={range}
        />
      </div>
    )
  }
}

TimeRangeSelect.propTypes = propTypes

export default withTranslation('translations')(TimeRangeSelect)
