import React, { PureComponent, Fragment } from 'react'
import { injectIntl } from 'react-intl'
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
      intl,
      syncMode,
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
              {intl.formatMessage({ id: getTooltipMessageId(syncMode) })}
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
          title={intl.formatMessage({ id: 'sync.switch-mode' })}
          autoFocus
          canEscapeKeyClose={false}
          canOutsideClickClose={false}
          enforceFocus
          usePortal
        >
          <div className={Classes.DIALOG_BODY}>
            { syncMode === MODE_ONLINE
              ? intl.formatMessage({ id: 'sync.description' })
              : intl.formatMessage({ id: 'sync.sync-description' }) }
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.handleDialogClose}>
                {intl.formatMessage({ id: 'sync.close' })}
              </Button>
              <Button
                intent={Intent.PRIMARY}
                onClick={this.startAction}
              >
                { syncMode === MODE_ONLINE
                  ? intl.formatMessage({ id: 'sync.start' })
                  : intl.formatMessage({ id: 'sync.stop-sync' }) }
              </Button>
            </div>
          </div>
        </Dialog>
      </Fragment>
    )
  }
}

export default injectIntl(SyncMode)
