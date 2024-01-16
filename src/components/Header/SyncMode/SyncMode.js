import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Tooltip,
  Popover,
  Position,
} from '@blueprintjs/core'

import config from 'config'

import {
  getSyncIcon,
  getSyncTitle,
  getSyncTooltipContent,
} from './SyncMode.helpers'

const SyncMode = ({
  t,
  isSyncing,
  stopSyncNow,
  syncProgress,
  startSyncNow,
  estimatedSyncTime,
  isInitSyncPopupOpen,
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
      <Popover
        autoFocus={false}
        usePortal={false}
        isOpen
        position={Position.BOTTOM}
        // onOpening={() => togglePopover(true)}
        // onClosing={() => togglePopover(false)}
        content={(
          <div className='sync-mode--popover-content'>
            Welcome to the Bitfinex Reports App. Your trading history is currently synchronizing, please wait until it's finished in order to view your reports.
          </div>
          )}
        targetTagName='div'
        popoverClassName='sync-mode--info-popover'
      >
      <Tooltip
        className='sync-mode'
        position={Position.BOTTOM}
        content={getSyncTooltipContent(t, isSyncing, estimatedSyncTime)}
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
    </Popover>
    </>
  )
}

SyncMode.propTypes = {
  t: PropTypes.func.isRequired,
  stopSyncNow: PropTypes.func,
  startSyncNow: PropTypes.func,
  isSyncing: PropTypes.bool.isRequired,
  isInitSyncPopupOpen: PropTypes.bool.isRequired,
  syncProgress: PropTypes.number.isRequired,
  estimatedSyncTime: PropTypes.shape({
    leftTime: PropTypes.number,
    spentTime: PropTypes.number,
    syncStartedAt: PropTypes.number,
  }).isRequired,
}

SyncMode.defaultProps = {
  stopSyncNow: () => {},
  startSyncNow: () => {},
}

export default memo(SyncMode)
