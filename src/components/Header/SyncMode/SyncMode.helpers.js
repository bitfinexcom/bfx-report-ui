import React from 'react'
import { Spinner } from '@blueprintjs/core'

import Icon from 'icons'

export const getSyncTitle = (isSyncing) => (
  isSyncing
    ? 'sync.stop-sync'
    : 'sync.start'
)

export const getSyncTooltipMessage = (isSyncing) => (
  isSyncing
    ? 'sync.insync_tooltip'
    : 'sync.start_sync_tooltip'
)

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
  getSyncTooltipMessage,
}
