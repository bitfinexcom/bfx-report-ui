import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const getItems = (t) => [
  { value: constants.DAY, label: t('timeframe.day') },
  { value: constants.WEEK, label: t('timeframe.week') },
  { value: constants.MONTH, label: t('timeframe.month') },
  { value: constants.YEAR, label: t('timeframe.year') },
]

const TimeFrameSelector = (props) => {
  const { onChange, value } = props
  const { t } = useTranslation()

  const items = getItems(t)

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className='bitfinex-select--timeframe'
      popoverClassName='bitfinex-select-menu--timeframe'
    />
  )
}

TimeFrameSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TimeFrameSelector
