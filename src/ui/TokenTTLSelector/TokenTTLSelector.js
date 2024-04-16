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
    { value: 86400, label: t('auth.ttlSelect.1day') },
    { value: 172800, label: t('auth.ttlSelect.2days') },
    { value: 259200, label: t('auth.ttlSelect.3days') },
    { value: 345600, label: t('auth.ttlSelect.4days') },
    { value: 432000, label: t('auth.ttlSelect.5days') },
    { value: 518400, label: t('auth.ttlSelect.6days') },
    { value: 604800, label: t('auth.ttlSelect.7days') },
  ]

  const handleChange = useCallback((value) => {
    dispatch(setIsPdfRequired(value))
  }, [dispatch])

  return (
    <Select
      items={items}
      onChange={handleChange}
      value={isPdfExportRequired}
    />
  )
}

export default ExportTypeSelector
