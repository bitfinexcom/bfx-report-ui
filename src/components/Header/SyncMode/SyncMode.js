import React, { memo } from 'react'
import {
  Position,
  Tooltip,
} from '@blueprintjs/core'

import config from 'config'

import { propTypes, defaultProps } from './SyncMode.props'
import {
  getSyncIcon,
  getSyncTitle,
  getSyncTooltipMessage,
} from './SyncMode.helpers'

const SyncMode = ({
  isSyncing,
  syncProgress,
  startSyncNow,
  stopSyncNow,
  t,
}) => {
  const handleSync = () => {
    if (isSyncing) {
      stopSyncNow()
    } else {
      startSyncNow()
    }
  }

  const syncIcon = getSyncIcon(isSyncing, syncProgress)

  if (!config.showFrameworkMode) {
    return null
  }

  return (
    <>
      <Tooltip
        className='sync-mode'
        content={t(getSyncTooltipMessage(isSyncing))}
        position={Position.BOTTOM}
      >
        <div className='sync-mode-wrapper' onClick={handleSync}>
          <div className='sync-mode-icon-wrapper'>
            <div className='sync-mode-icon'>
              {syncIcon}
            </div>
          </div>
          <span className='sync-mode-status'>{t(getSyncTitle(isSyncing))}</span>
        </div>
      </Tooltip>
    </>
  )
}


SyncMode.propTypes = propTypes
SyncMode.defaultProps = defaultProps

export default memo(SyncMode)
