import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import {
  Tooltip,
  Popover,
  Position,
} from '@blueprintjs/core'
import { isEqual } from '@bitfinex/lib-js-util-base'

import Icon from 'icons'
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
  showInitSyncPopup,
  isInitSyncPopupOpen,
}) => {
  const [isLongSync, setIsLongSync] = useState(false)
  const [prevProgress, setPrevProgress] = useState(null)

  useEffect(() => {
    setPrevProgress(syncProgress)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isEqual(prevProgress, syncProgress)) {
        setIsLongSync(true)
      } else {
        setIsLongSync(false)
        setPrevProgress(syncProgress)
      }
    }, 5000)
    return () => clearTimeout(timeout)
  }, [syncProgress, prevProgress])

  const handleSync = () => {
    if (isSyncing) {
      stopSyncNow()
    } else {
      startSyncNow()
    }
  }

  const syncIcon = getSyncIcon(isSyncing, syncProgress, !isLongSync)

  const popupInfo = isLongSync
    ? t('sync.init-sync-info.additional')
    : t('sync.init-sync-info.main')

  if (!config.showFrameworkMode) {
    return null
  }

  return (
    <>
      <Popover
        autoFocus={false}
        usePortal={false}
        position={Position.BOTTOM}
        isOpen={isInitSyncPopupOpen}
        content={(
          <div className='sync-mode--popover-content'>
            {popupInfo}
            <div
              className='sync-mode--close-btn'
              onClick={() => showInitSyncPopup(false)}
            >
              <Icon.CLOSE />
            </div>
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
  showInitSyncPopup: PropTypes.func,
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
  showInitSyncPopup: () => {},
}

export default memo(SyncMode)
