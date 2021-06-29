import React, { PureComponent } from 'react'
import {
  Button,
  AnchorButton,
  Callout,
  Classes,
  Dialog,
  Intent,
  Position,
  Tooltip,
} from '@blueprintjs/core'

import SyncButton from 'ui/SyncButton'
import Icon from 'icons'
import MultiPairSelector from 'ui/MultiPairSelector'
import config from 'config'

import { propTypes, defaultProps } from './DerivativesSyncPref.props'

class DerivativesSyncPref extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.state = this.getInitialState()
  }

  componentDidUpdate(prevProps) {
    const { syncPairs } = this.props

    if (syncPairs !== prevProps.syncPairs) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        pairs: syncPairs,
      })
    }
  }

  getInitialState = () => {
    const { syncPairs } = this.props

    return {
      isOpen: false,
      pairs: syncPairs,
    }
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState(this.getInitialState())
  }

  togglePair = (pair) => {
    const { pairs } = this.state
    if (pairs.includes(pair)) {
      this.setState({
        pairs: pairs.filter(tempPair => tempPair !== pair),
      })
    } else {
      this.setState({ pairs: [...pairs, pair] })
    }
  }

  handleDateChange = (time) => {
    this.setState({ start: time })
  }

  handleApply = () => {
    const { pairs, start } = this.state
    const { setSyncPref } = this.props
    this.setState({ isOpen: false })
    setSyncPref(pairs, start, true)
  }

  render() {
    const {
      isSyncing,
      syncPairs,
      t,
    } = this.props
    const {
      isOpen,
      pairs,
    } = this.state

    if (!config.showFrameworkMode) {
      return null
    }

    const renderInSyncWarning = isSyncing
      ? (
        <Callout>
          {t('preferences.sync.insync-warning')}
        </Callout>
      )
      : null

    return (
      <>
        <SyncButton onClick={this.handleOpen} />
        <Dialog
          className='sync-pref-dialog'
          icon={<Icon.TRAY_IMPORT />}
          isCloseButtonShown={false}
          onClose={this.handleClose}
          title={t('preferences.sync.title')}
          isOpen={isOpen}
        >
          <div className={Classes.DIALOG_BODY}>
            {renderInSyncWarning}
            <div className='bitfinex-row'>
              <div className='bitfinex-row-item'>
                <div className='bitfinex-row-item-label'>{t('preferences.sync.pairs')}</div>
                <MultiPairSelector
                  currentFilters={pairs}
                  existingPairs={syncPairs}
                  togglePair={this.togglePair}
                />
              </div>
            </div>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.handleClose}>
                {t('preferences.close')}
              </Button>
              <Tooltip
                content={t('preferences.sync.apply-tooltip')}
                position={Position.TOP}
                usePortal={false}
              >
                <AnchorButton
                  onClick={this.handleApply}
                  intent={Intent.PRIMARY}
                  disabled={isSyncing}
                >
                  {t('preferences.sync.btn-apply')}
                </AnchorButton>
              </Tooltip>
            </div>
          </div>
        </Dialog>
      </>
    )
  }
}

export default DerivativesSyncPref
