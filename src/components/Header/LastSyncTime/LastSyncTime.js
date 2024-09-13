import React from 'react'
import { useSelector } from 'react-redux'

import { getIsSyncing, getLastSyncTime } from 'state/sync/selectors'

const LastSyncTime = () => {
  const isSyncing = useSelector(getIsSyncing)
  const lasSyncTime = useSelector(getLastSyncTime)
  console.log('+++lasSyncTime', lasSyncTime)

  const content = isSyncing
    ? 'Syncing...'
    : 'Last Sync was 3 hours ago'

  return (
    <div className='last-sync-time'>
      <span>{content}</span>
    </div>
  )
}

export default LastSyncTime
