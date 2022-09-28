import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'
import goToRangeTypes from 'state/goToRange/constants'

const {
  DATE,
  CUSTOM,
} = goToRangeTypes

const RangeTypeSelect = ({ onChange, range, t }) => {
  const items = [
    { value: DATE, label: t('timeframe.date') },
    { value: CUSTOM, label: t('timeframe.custom_range') },
  ]

  return (
    <div className='range-type-select-row'>
      <Select
        items={items}
        value={range}
        onChange={onChange}
        className='range-type-select'
        popoverClassName='range-type-select'
      />
    </div>
  )
}

RangeTypeSelect.propTypes = {
  t: PropTypes.func.isRequired,
  range: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default memo(withTranslation('translations')(RangeTypeSelect))
