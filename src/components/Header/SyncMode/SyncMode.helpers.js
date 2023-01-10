import React from 'react'
import { Spinner } from '@blueprintjs/core'
import _round from 'lodash/round'
import _isNull from 'lodash/isNull'

import Icon from 'icons'
import { getFormattedDate } from 'utils/dates'

const getEstimatedSyncTime = ({
  leftTime = null,
  spentTime = null,
  syncStartedAt = null,
}, t) => {
  const start = _isNull(syncStartedAt)
    ? t('sync.estimated_time.estimating')
    : getFormattedDate(syncStartedAt)

  const spent = _isNull(spentTime)
    ? t('sync.estimated_time.estimating')
    : ` ${_round(spentTime)} ms`

  const left = _isNull(leftTime)
    ? t('sync.estimated_time.estimating')
    : `${_round(leftTime)} ms`

  return {
    start,
    spent,
    left,
  }
}

export const getSyncTitle = (isSyncing) => (
  isSyncing
    ? 'sync.stop-sync'
    : 'sync.start'
)

export const getSyncTooltipContent = (t, isSyncing, estimatedSyncTime) => {
  const { start, spent, left } = getEstimatedSyncTime(estimatedSyncTime, t)

  if (isSyncing) {
    return (
      <>
        <p>{t('sync.insync_tooltip')}</p>
        <p>
          {t('sync.estimated_time.started_at')}
          {start}
        </p>
        <p>
          {t('sync.estimated_time.spent_time')}
          {spent}
        </p>
        <p>
          {t('sync.estimated_time.left_time')}
          {left}
        </p>
      </>
    )
  }
  return <>{t('sync.start_sync_tooltip')}</>
}

export const getSyncIcon = (isSyncing, syncProgress) => {
  if (isSyncing) {
    return (
      <>
        <Spinner size={20} />
        <div className='bitfinex-sync-progress'>
          {syncProgress}
        </div>
      </>
    )
  }
  return <Icon.REFRESH_DOUBLE />
}

export default {
  getSyncIcon,
  getSyncTitle,
  getSyncTooltipContent,
}
