import React, { PureComponent } from 'react'
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

const {
  MODE_SYNCING,
} = mode

class SyncMode extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  handleSync = () => {
    const { startSyncNow, stopSyncNow, syncMode } = this.props
    if (syncMode === MODE_SYNCING) {
      stopSyncNow()
    } else {
      startSyncNow()
    }
  }

  render() {
    const {
      syncMode,
      syncProgress,
      t,
    } = this.props

    if (!config.showFrameworkMode) {
      return null
    }

    const syncIcon = getSyncIcon(syncMode, syncProgress)

    return (
      <>
        <Tooltip
          className='sync-mode'
          content={t(getSyncTooltipMessage(syncMode))}
          position={Position.BOTTOM}
        >
          <div className='sync-mode-wrapper' onClick={this.handleSync}>
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
}

export default SyncMode
