import React, { memo, useMemo } from 'react'
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

const TimeFrameSelector = ({ onChange, value, className }) => {
  const { t } = useTranslation()
  const items = useMemo(() => getItems(t), [t])

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className={className}
      popoverClassName='bitfinex-select-menu--timeframe'
    />
  )
}

TimeFrameSelector.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TimeFrameSelector.defaultProps = {
  className: '',
}

export default memo(TimeFrameSelector)
