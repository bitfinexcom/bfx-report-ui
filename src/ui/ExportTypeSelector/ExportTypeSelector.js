import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { setIsPdfRequired } from 'state/query/actions'
import { getIsPdfExportRequired } from 'state/query/selectors'

import Select from 'ui/Select'

const ExportTypeSelector = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isPdfExportRequired = useSelector(getIsPdfExportRequired)
  const items = [
    { value: false, label: t('download.exportAsCsv') },
    { value: true, label: t('download.exportAsPdf') },
  ]

  const handleChange = useCallback((value) => {
    dispatch(setIsPdfRequired(value))
  }, [dispatch])

  return (
    <Select
      items={items}
      onChange={handleChange}
      value={isPdfExportRequired}
      // type='Export Format'
      // className='bitfinex-select--unrealized-profit'
      // popoverClassName='bitfinex-select-menu--unrealized-profit'
    />
  )
}

export default ExportTypeSelector
