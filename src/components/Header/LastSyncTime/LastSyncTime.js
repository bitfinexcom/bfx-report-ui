import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _floor from 'lodash/floor'

import { getIsSyncing, getLastSyncTime } from 'state/sync/selectors'

const getLastSyncLabel = (lastSyncTime, t) => {
  const now = Date.now()
  const duration = now - lastSyncTime
  const hours = _floor(duration / 3600000)
  const label = hours > 1
    ? t('sync.last-sync-time.sync-was', { hours })
    : t('sync.last-sync-time.sync-was-less-than-hour')
  return label
}

const LastSyncTime = () => {
  const { t } = useTranslation()
  const isSyncing = useSelector(getIsSyncing)
  const lasSyncTime = useSelector(getLastSyncTime)
  console.log('+++lasSyncTime', lasSyncTime)
  const lastSyncLabel = getLastSyncLabel(lasSyncTime, t)

  const content = isSyncing
    ? 'Syncing...'
    : lastSyncLabel

  return (
    <div className='last-sync-time'>
      <span>{content}</span>
    </div>
  )
}

export default LastSyncTime
