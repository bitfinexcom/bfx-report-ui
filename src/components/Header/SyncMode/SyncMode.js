import React, { memo } from 'react'
import {
  Position,
  Tooltip,
} from '@blueprintjs/core'

import mode from 'state/sync/constants'
import config from 'config'

import { propTypes, defaultProps } from './SyncMode.props'
import {
  getSyncIcon,
  getSyncTitle,
  getSyncTooltipMessage,
} from './SyncMode.helpers'

const SyncMode = ({
  syncMode,
  syncProgress,
  startSyncNow,
  stopSyncNow,
  t,
}) => {
  const handleSync = () => {
    const { MODE_SYNCING } = mode

    if (syncMode === MODE_SYNCING) {
      stopSyncNow()
    } else {
      startSyncNow()
    }
  }

  const syncIcon = getSyncIcon(syncMode, syncProgress)

  if (!config.showFrameworkMode) {
    return null
  }

  return (
    <>
      <Tooltip
        className='sync-mode'
        content={t(getSyncTooltipMessage(syncMode))}
        position={Position.BOTTOM}
      >
        <div className='sync-mode-wrapper' onClick={handleSync}>
          <div className='sync-mode-icon-wrapper'>
            <div className='sync-mode-icon'>
              {syncIcon}
            </div>
          </div>
          <span className='sync-mode-status'>{t(getSyncTitle(syncMode))}</span>
        </div>
      </Tooltip>
    </>
  )
}


SyncMode.propTypes = propTypes
SyncMode.defaultProps = defaultProps

export default memo(SyncMode)
