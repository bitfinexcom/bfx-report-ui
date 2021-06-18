import React from 'react'
import { Spinner } from '@blueprintjs/core'

import Icon from 'icons'
import mode from 'state/sync/constants'

const {
  MODE_OFFLINE,
  MODE_SYNCING,
} = mode


export const getSyncTitle = (syncMode) => {
  switch (syncMode) {
    case MODE_OFFLINE:
    default:
      return 'sync.start'
    case MODE_SYNCING:
      return 'sync.stop-sync'
  }
}

export const getSyncTooltipMessage = (syncMode) => {
  switch (syncMode) {
    default:
      return 'sync.start_sync_tooltip'
    case MODE_SYNCING:
      return 'sync.insync_tooltip'
  }
}

export const getSyncIcon = (syncMode, syncProgress) => {
  switch (syncMode) {
    default:
      return <Icon.REFRESH_DOUBLE />
    case MODE_SYNCING:
      return (
        <>
          <Spinner size={20} />
          <div className='bitfinex-sync-progress'>
            {syncProgress}
          </div>
        </>
      )
  }
}

export default {
  getSyncIcon,
  getSyncTitle,
  getSyncTooltipMessage,
}
