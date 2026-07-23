import React, { useMemo } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _round from 'lodash/round'
import { isNil } from '@bitfinex/lib-js-util-base'

import { formatDate } from 'state/utils'
import { getTimezone } from 'state/base/selectors'
import { getIsSyncing, getLastSyncTime } from 'state/sync/selectors'

const MINUTE = 60000

const getLastSyncLabel = (lastSyncTime, timezone, t) => {
  if (isNil(lastSyncTime)) return ''

  const minutes = (Date.now() - lastSyncTime) / MINUTE

  if (minutes < 1) return t('sync.last-sync-time.just-now')
  if (minutes < 5) return t('sync.last-sync-time.less-than-mins', { mins: 5 })
  if (minutes < 10) return t('sync.last-sync-time.less-than-mins', { mins: 10 })
  if (minutes < 15) return t('sync.last-sync-time.less-than-mins', { mins: 15 })
  if (minutes < 30) return t('sync.last-sync-time.less-than-mins', { mins: 30 })
  if (minutes < 60) return t('sync.last-sync-time.sync-was-less-than-hour')

  const days = moment().startOf('day').diff(moment(lastSyncTime).startOf('day'), 'days')

  if (days === 0) {
    const hours = _round(minutes / 60)
    return hours <= 1
      ? t('sync.last-sync-time.sync-was-hour')
      : t('sync.last-sync-time.sync-was', { hours })
  }
  if (days === 1) return t('sync.last-sync-time.yesterday')
  if (days <= 7) return t('sync.last-sync-time.days-ago', { days })

  return t('sync.last-sync-time.on-date', {
    date: formatDate(lastSyncTime, timezone, 'DD MMM YYYY'),
  })
}

const LastSyncTime = () => {
  const { t } = useTranslation()
  const isSyncing = useSelector(getIsSyncing)
  const timezone = useSelector(getTimezone)
  const lastSyncTime = useSelector(getLastSyncTime)

  const lastSyncLabel = useMemo(
    () => getLastSyncLabel(lastSyncTime, timezone, t),
    [lastSyncTime, timezone, t],
  )

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
