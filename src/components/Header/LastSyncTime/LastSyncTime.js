import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _floor from 'lodash/floor'
import { isNil } from '@bitfinex/lib-js-util-base'

import { getIsSyncing, getLastSyncTime } from 'state/sync/selectors'

const getLastSyncLabel = (lastSyncTime, t) => {
  if (isNil(lastSyncTime)) return ''
  const now = Date.now()
  const hours = _floor((now - lastSyncTime) / 3600000)
  return hours > 1
    ? t('sync.last-sync-time.sync-was', { hours })
    : t('sync.last-sync-time.sync-was-less-than-hour')
}

const LastSyncTime = () => {
  const { t } = useTranslation()
  const isSyncing = useSelector(getIsSyncing)
  const lasSyncTime = useSelector(getLastSyncTime)
  console.log('+++lasSyncTime', lasSyncTime)
  const lastSyncLabel = getLastSyncLabel(lasSyncTime, t)

  const content = isSyncing
    ? t('sync.last-sync-time.syncing')
    : lastSyncLabel

  return (
    <div className='last-sync-time'>
      <span>{content}</span>
    </div>
  )
}

export default LastSyncTime
