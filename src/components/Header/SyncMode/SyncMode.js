import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Position,
  Tooltip,
} from '@blueprintjs/core'

import config from 'config'

import {
  getSyncIcon,
  getSyncTitle,
  getSyncTooltipMessage,
} from './SyncMode.helpers'

const SyncMode = ({
  t,
  isSyncing,
  stopSyncNow,
  startSyncNow,
  syncProgress,
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
        position={Position.BOTTOM}
        content={t(getSyncTooltipMessage(isSyncing))}
      >
        <div className='sync-mode-wrapper' onClick={handleSync}>
          <div className='sync-mode-icon-wrapper'>
            <div className='sync-mode-icon'>
              {syncIcon}
            </div>
          </div>
          <span className='sync-mode-status'>
            {t(getSyncTitle(isSyncing))}
          </span>
        </div>
      </Tooltip>
    </>
  )
}

SyncMode.propTypes = {
  t: PropTypes.func.isRequired,
  stopSyncNow: PropTypes.func,
  startSyncNow: PropTypes.func,
  isSyncing: PropTypes.bool.isRequired,
  syncProgress: PropTypes.number.isRequired,
}

SyncMode.defaultProps = {
  startSyncNow: () => {},
  stopSyncNow: () => {},
}

export default memo(SyncMode)
