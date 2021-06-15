import React, { PureComponent } from 'react'
import {
  Button,
  Classes,
  Dialog,
  Position,
  Tooltip,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import mode from 'state/sync/constants'
import config from 'config'

import { propTypes, defaultProps } from './SyncMode.props'
import {
  getModeIcon,
  getSyncIcon,
  getModeTitle,
  getSyncTitle,
  getModeTooltipMessage,
  getSyncTooltipMessage,
} from './SyncMode.helpers'

const {
  MODE_ONLINE,
  MODE_OFFLINE,
  MODE_SYNCING,
} = mode

class SyncMode extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  state = {
    isOpen: false,
  }

  handleToggleClick = () => {
    const { syncMode, stopSyncing } = this.props
    if (syncMode !== MODE_OFFLINE) {
      this.setState({ isOpen: true })
    } else {
      stopSyncing()
    }
  }

  handleDialogClose = () => {
    this.setState({ isOpen: false })
  }

  switchMode = () => {
    const { syncMode, setSyncMode } = this.props
    if (syncMode === MODE_ONLINE) {
      setSyncMode(MODE_OFFLINE)
    } else {
      setSyncMode(MODE_ONLINE)
    }
  }

  startAction = () => {
    const { startSyncing, stopSyncing, syncMode } = this.props
    if (syncMode === MODE_ONLINE) {
      startSyncing()
    }

    if (syncMode === MODE_SYNCING) {
      stopSyncing()
    }

    this.setState({ isOpen: false })
  }

  render() {
    const {
      syncMode,
      syncProgress,
      t,
    } = this.props
    const { isOpen } = this.state

    if (!config.showFrameworkMode) {
      return (
        <div className='sync-mode'>
          <div className='sync-mode-wrapper' onClick={this.handleToggleClick}>
            <div className='sync-mode-icon-wrapper'>
              <div className='sync-mode-icon'>
                <Icon.CHECKMARK_CIRCLE />
              </div>
            </div>
            <span className='sync-mode-status'>{t('sync.online')}</span>
          </div>
        </div>
      )
    }

    const modeIcon = getModeIcon(syncMode)
    const syncIcon = getSyncIcon(syncMode, syncProgress)

    return (
      <>
        <Tooltip
          className='sync-mode'
          content={t(getSyncTooltipMessage(syncMode))}
          position={Position.BOTTOM}
        >
          <div className='sync-mode-wrapper' onClick={this.handleToggleClick}>
            <div className='sync-mode-icon-wrapper'>
              <div className='sync-mode-icon'>
                {syncIcon}
              </div>
            </div>
            <span className='sync-mode-status'>{t(getSyncTitle(syncMode))}</span>
          </div>
        </Tooltip>
        <Dialog
          icon={<Icon.LOOP />}
          isOpen={isOpen}
          onClose={this.handleDialogClose}
          title={t('sync.switch-mode')}
          isCloseButtonShown={false}
        >
          <div className={Classes.DIALOG_BODY}>
            <p className='extra-line-height'>
              {syncMode === MODE_ONLINE ? t('sync.description') : t('sync.sync-description')}
            </p>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.handleDialogClose}>
                {t('sync.close')}
              </Button>
              <Button
                intent={Intent.PRIMARY}
                onClick={this.startAction}
              >
                { syncMode === MODE_ONLINE
                  ? t('sync.start')
                  : t('sync.stop-sync') }
              </Button>
            </div>
          </div>
        </Dialog>
        <Tooltip
          className='sync-mode'
          content={t(getModeTooltipMessage(syncMode))}
          position={Position.BOTTOM}
        >
          <div className='sync-mode-wrapper' onClick={this.switchMode}>
            <div className='sync-mode-icon-wrapper'>
              <div className='sync-mode-icon'>
                {modeIcon}
              </div>
            </div>
            <span className='sync-mode-status'>{t(getModeTitle(syncMode))}</span>
          </div>
        </Tooltip>
      </>
    )
  }
}

export default SyncMode
