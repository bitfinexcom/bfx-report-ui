import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { setAuthTokenTTL } from 'state/auth/actions'
import { getAuthTokenTTL } from 'state/auth/selectors'

import Select from 'ui/Select'

const getItems = (t) => [
  { value: 86400, label: t('auth.ttlSelect.1day') },
  { value: 172800, label: t('auth.ttlSelect.2days') },
  { value: 259200, label: t('auth.ttlSelect.3days') },
  { value: 345600, label: t('auth.ttlSelect.4days') },
  { value: 432000, label: t('auth.ttlSelect.5days') },
  { value: 518400, label: t('auth.ttlSelect.6days') },
  { value: 604800, label: t('auth.ttlSelect.7days') },
]

const ExportTypeSelector = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const authTokenTTL = useSelector(getAuthTokenTTL)
  const items = useMemo(() => getItems(t), [t])

  const handleChange = useCallback((value) => {
    dispatch(setAuthTokenTTL(value))
  }, [dispatch])

  return (
    <Select
      items={items}
      value={authTokenTTL}
      onChange={handleChange}
    />
  )
}

export default ExportTypeSelector
