import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Callout,
  Classes,
  Dialog,
  Intent,
  Position,
  Tooltip,
} from '@blueprintjs/core'

import DateInput from 'ui/DateInput'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import mode from 'state/sync/constants'
import { dialogDescStyle, dialogFieldStyle, dialogSmallDescStyle } from 'ui/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './SyncSymbolPrefButton.props'

const ICON = 'issue-new'

const initState = {
  isOpen: false,
  tempSymbols: [],
  tempTime: undefined,
}

class SyncSymbolPrefButton extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps


  state = initState

  static getDerivedStateFromProps(nextProps, prevState) {
    // fill init state from props
    if (prevState.tempSymbols.length === 0 || prevState.tempTime === undefined) {
      return {
        tempSymbols: nextProps.syncSymbols.map(symbol => symbol.toUpperCase()),
        tempTime: new Date(nextProps.startTime),
      }
    }
    return null
  }

  handleOpen = (e) => {
    e.preventDefault()
    this.setState({ isOpen: true })
  }

  handleClose = (e) => {
    e.preventDefault()
    this.setState(initState)
  }

  toggleSymbol = (symbol) => {
    const { tempSymbols } = this.state

    if (tempSymbols.includes(symbol)) {
      this.setState({ tempSymbols: tempSymbols.filter(tag => tag !== symbol) })
    } else {
      this.setState({ tempSymbols: [...tempSymbols, symbol] })
    }
  }

  handleDateChange = (time) => {
    this.setState({ tempTime: time })
  }

  handleApply = () => {
    const { tempSymbols, tempTime } = this.state
    const { setSyncPref } = this.props
    setSyncPref(tempSymbols, tempTime, true)
    this.setState({ isOpen: false })
  }

  render() {
    const {
      syncMode,
      syncSymbols,
      t,
      textOnly,
    } = this.props
    const {
      isOpen,
      tempSymbols,
      tempTime,
    } = this.state
    const renderInSyncWarning = syncMode === mode.MODE_SYNCING
      ? (
        <Fragment>
          <Callout intent={Intent.WARNING}>
            {t('preferences.sync.insync-warning')}
          </Callout>
          <br />
        </Fragment>
      )
      : null
    return platform.showSyncMode
      ? (
        <Fragment>
          {' '}
          <Tooltip
            content={(
              <span>
                {t('preferences.sync.title')}
              </span>
              )}
            position={Position.TOP}
            usePortal={false}
          >
            <Button
              icon={textOnly ? null : ICON}
              onClick={this.handleOpen}
              intent={Intent.PRIMARY}
            >
              {textOnly ? t('preferences.sync.title') : ''}
            </Button>
          </Tooltip>
          <Dialog
            icon={ICON}
            onClose={this.handleClose}
            title={t('preferences.sync.title')}
            autoFocus
            canEscapeKeyClose
            canOutsideClickClose
            enforceFocus
            usePortal
            isOpen={isOpen}
          >
            <div className={Classes.DIALOG_BODY}>
              {renderInSyncWarning}
              <div className='row'>
                <div className={dialogDescStyle}>
                  {t('preferences.sync.symbols')}
                </div>
                <div className={dialogSmallDescStyle}>
                  {t('preferences.sync.symbols')}
                </div>
                <div className={dialogFieldStyle}>
                  <MultiSymbolSelector
                    currentFilters={tempSymbols}
                    existingCoins={syncSymbols}
                    toggleSymbol={this.toggleSymbol}
                    onSymbolSelect={this.addSymbol}
                    handleTagRemove={this.handleTagRemove}
                  />
                </div>
              </div>
              <div className='row'>
                <div className={dialogDescStyle}>
                  {t('preferences.sync.starttime')}
                </div>
                <div className={dialogSmallDescStyle}>
                  {t('preferences.sync.starttime')}
                </div>
                <div className={dialogFieldStyle}>
                  <DateInput onChange={this.handleDateChange} value={tempTime} />
                </div>
              </div>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Tooltip
                  content={(
                    <span>
                      {t('preferences.sync.apply-tooltip')}
                    </span>
                    )}
                  position={Position.TOP}
                  usePortal={false}
                >
                  <Button
                    onClick={this.handleApply}
                    intent={Intent.PRIMARY}
                    disabled={(
                      syncMode === mode.MODE_SYNCING
                      || tempSymbols.length === 0
                      || tempTime === undefined
                    )}
                  >
                    {t('preferences.sync.btn-apply')}
                  </Button>
                </Tooltip>
                <Button onClick={this.handleClose}>
                  {t('preferences.close')}
                </Button>
              </div>
            </div>
          </Dialog>
        </Fragment>
      )
      : null
  }
}

export default withTranslation('translations')(SyncSymbolPrefButton)
