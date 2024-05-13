import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEqual } from '@bitfinex/lib-js-util-base'

import Select from 'ui/Select'
import types from 'state/base/constants'
import { setDateFormat } from 'state/base/actions'
import { getDateFormat } from 'state/base/selectors'

const DateFormatSelector = () => {
  const dispatch = useDispatch()
  const dateFormat = useSelector(getDateFormat)
  const handleClick = useCallback((format) => {
    if (!isEqual(dateFormat, format)) {
      dispatch(setDateFormat(format))
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

export default memo(DateFormatSelector)
