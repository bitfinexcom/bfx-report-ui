import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { setAuthTokenTTL } from 'state/auth/actions'
import { getAuthTokenTTL } from 'state/auth/selectors'

import Select from 'ui/Select'

const getItems = (t) => [
  { value: 86400, label: `1 ${t('auth.ttlSelect.day')}` },
  { value: 172800, label: `2 ${t('auth.ttlSelect.days_1')}` },
  { value: 259200, label: `3 ${t('auth.ttlSelect.days_1')}` },
  { value: 345600, label: `4 ${t('auth.ttlSelect.days_1')}` },
  { value: 432000, label: `5 ${t('auth.ttlSelect.days_2')}` },
  { value: 518400, label: `6 ${t('auth.ttlSelect.days_2')}` },
  { value: 604800, label: `7 ${t('auth.ttlSelect.days_2')}` },
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
