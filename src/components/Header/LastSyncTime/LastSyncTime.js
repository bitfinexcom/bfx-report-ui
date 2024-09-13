import React from 'react'
import { useSelector } from 'react-redux'

import { getLastSyncTime } from 'state/sync/selectors'

const LastSyncTime = () => {
  const lasSyncTime = useSelector(getLastSyncTime)
  console.log('+++lasSyncTime', lasSyncTime)

  return (
    <p className='last-sync-time'>
      Last sync was 3 hours ago
    </p>
  )
}

export default LastSyncTime
