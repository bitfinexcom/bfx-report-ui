import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const {
  DAY, WEEK, MONTH, YEAR,
} = constants

const getItems = (t) => [
  { value: DAY, label: t('timeframe.day') },
  { value: WEEK, label: t('timeframe.week') },
  { value: MONTH, label: t('timeframe.month') },
  { value: YEAR, label: t('timeframe.year') },
]

const TimeFrameSelector = (props) => {
  const { onChange, value } = props
  const { t } = useTranslation()

  const items = getItems(t)

  return (
    <Select
      className='bitfinex-select--timeframe'
      popoverClassName='bitfinex-select-menu--timeframe'
      value={value}
      items={items}
      onChange={onChange}
    />
  )
}

TimeFrameSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TimeFrameSelector
