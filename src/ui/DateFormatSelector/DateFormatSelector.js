import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/Select'
import types from 'state/base/constants'

const DateFormatSelector = ({ dateFormat, setDateFormat }) => {
  const handleClick = useCallback((format) => {
    if (dateFormat !== format) {
      setDateFormat(format)
    }
  }, [dateFormat, setDateFormat])

  return (
    <Select
      type={'Date Format'}
      value={dateFormat}
      onChange={handleClick}
      items={types.DATE_FORMATS}
      className='bitfinex-select--date-format'
      popoverClassName='bitfinex-select-menu--date-format'
    />
  )
}

DateFormatSelector.propTypes = {
  dateFormat: PropTypes.string.isRequired,
  setDateFormat: PropTypes.func.isRequired,
}

export default memo(DateFormatSelector)
