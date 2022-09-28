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

import Icon from 'icons'
import SyncButton from 'ui/SyncButton'
import DateInput from 'ui/DateInput'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import config from 'config'

import { propTypes, defaultProps } from './SyncSymbolPrefButton.props'

class SyncSymbolPrefButton extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.state = this.getInitialState()
  }

  componentDidUpdate(prevProps) {
    const { syncSymbols } = this.props

    if (syncSymbols !== prevProps.syncSymbols) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        symbols: syncSymbols,
      })
    }
  }

  getInitialState = () => {
    const { syncSymbols, startTime } = this.props

    return {
      isOpen: false,
      symbols: syncSymbols,
      start: startTime,
    }
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState(this.getInitialState())
  }

  toggleSymbol = (symbol) => {
    const { symbols } = this.state

    if (symbols.includes(symbol)) {
      this.setState({ symbols: symbols.filter(tag => tag !== symbol) })
    } else {
      this.setState({ symbols: [...symbols, symbol] })
    }
  }

  handleDateChange = (time) => {
    this.setState({ start: time })
  }

  handleApply = () => {
    const { symbols, start } = this.state
    const { setSyncPref } = this.props
    setSyncPref(symbols, start, true)
    this.setState({ isOpen: false })
  }

  render() {
    const {
      isSyncing,
      syncSymbols,
      startTime,
      t,
    } = this.props
    const {
      isOpen,
      symbols,
      start,
    } = this.state
    const renderInSyncWarning = isSyncing
      ? (
        <Callout>
          {t('preferences.sync.insync-warning')}
        </Callout>
      )
      : null
    return config.showFrameworkMode
      ? (
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
                  <div className='bitfinex-row-item-label'>{t('preferences.sync.symbols')}</div>
                  <MultiSymbolSelector
                    currentFilters={symbols}
                    existingCoins={syncSymbols}
                    toggleSymbol={this.toggleSymbol}
                    onSymbolSelect={this.addSymbol}
                    handleTagRemove={this.handleTagRemove}
                  />
                </div>
                <div className='bitfinex-row-item'>
                  <div className='bitfinex-row-item-label'>{t('preferences.sync.starttime')}</div>
                  <DateInput
                    key={startTime}
                    onChange={this.handleDateChange}
                    defaultValue={startTime}
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
                    disabled={(isSyncing || !symbols.length || !start)}
                  >
                    {t('preferences.sync.btn-apply')}
                  </AnchorButton>
                </Tooltip>
              </div>
            </div>
          </Dialog>
        </>
      )
      : null
  }
}

export default SyncSymbolPrefButton
