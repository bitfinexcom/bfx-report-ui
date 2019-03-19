import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Position,
  Spinner,
  Tooltip,
  Intent,
} from '@blueprintjs/core'

import mode from 'state/sync/constants'
import { getIcon, getTooltipMessageId } from 'state/sync/utils'

import { propTypes, defaultProps } from './SyncMode.props'

const {
  MODE_ONLINE,
  MODE_OFFLINE,
  MODE_SYNCING,
} = mode

class SyncMode extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.startAction = this.startAction.bind(this)
  }

  state = {
    isSyncDialogOpen: false,
  }

  handleToggleClick(e) {
    e.preventDefault()
    const { syncMode, stopSyncing } = this.props
    if (syncMode !== MODE_OFFLINE) {
      this.setState({ isSyncDialogOpen: true })
    } else {
      stopSyncing()
    }
  }

  handleDialogClose(e) {
    e.preventDefault()
    this.setState({ isSyncDialogOpen: false })
  }

  startAction(e) {
    e.preventDefault()
    const { startSyncing, stopSyncing, syncMode } = this.props
    if (syncMode === MODE_ONLINE) {
      startSyncing()
    }

    if (syncMode === MODE_SYNCING) {
      stopSyncing()
    }

    this.setState({ isSyncDialogOpen: false })
  }

  render() {
    const {
      syncMode,
      t,
    } = this.props
    const { isSyncDialogOpen } = this.state
    const icon = getIcon(syncMode)

    const renderButton = icon !== 'refresh'
      ? (
        <Button
          className='bitfinex-help'
          minimal
          icon={icon}
          onClick={this.handleToggleClick}
        />
      )
      : (
        <Button
          className='bitfinex-help'
          minimal
          onClick={this.handleToggleClick}
        >
          <Spinner size={18} />
        </Button>
      )
    return (
      <Fragment>
        <Tooltip
          content={(
            <span>
              {t(getTooltipMessageId(syncMode))}
            </span>
          )}
          position={Position.LEFT}
          usePortal={false}
        >
          {renderButton}
        </Tooltip>
        <Dialog
          icon={icon}
          isOpen={isSyncDialogOpen}
          onClose={this.handleDialogClose}
          title={t('sync.switch-mode')}
          autoFocus
          canEscapeKeyClose={false}
          canOutsideClickClose={false}
          enforceFocus
          usePortal
        >
          <div className={Classes.DIALOG_BODY}>
            { syncMode === MODE_ONLINE
              ? t('sync.description')
              : t('sync.sync-description') }
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
      </Fragment>
    )
  }
}

export default withTranslation('translations')(SyncMode)
