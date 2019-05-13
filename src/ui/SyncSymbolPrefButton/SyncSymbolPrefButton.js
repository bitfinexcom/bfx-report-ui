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
import { DateInput } from '@blueprintjs/datetime'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import mode from 'state/sync/constants'
import { dialogDescStyle, dialogFieldStyle, dialogSmallDescStyle } from 'ui/utils'
import { DEFAULT_DATETIME_FORMAT, momentFormatter } from 'state/utils'
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

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.addSymbol = this.addSymbol.bind(this)
    this.handleTagRemove = this.handleTagRemove.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleApply = this.handleApply.bind(this)
  }

  state = initState

  static getDerivedStateFromProps(nextProps, prevState) {
    // fill init state from props
    if (prevState.tempSymbols.length === 0 || prevState.tempTime === undefined) {
      return {
        tempSymbols: nextProps.syncSymbols,
        tempTime: new Date(nextProps.startTime),
      }
    }
    return null
  }

  handleOpen(e) {
    e.preventDefault()
    this.setState({ isOpen: true })
  }

  handleClose(e) {
    e.preventDefault()
    this.setState(initState)
  }

  addSymbol(symbol) {
    return () => {
      const { tempSymbols } = this.state
      if (!tempSymbols.includes(symbol)) {
        this.setState({ tempSymbols: [...tempSymbols, symbol] })
      }
    }
  }

  handleTagRemove(tag) {
    const { tempSymbols } = this.state
    const parsedTag = tag.toLowerCase()
    if (tempSymbols.includes(parsedTag)) {
      const symbols = tempSymbols.filter(symbol => symbol !== parsedTag)
      this.setState({ tempSymbols: symbols })
    }
  }

  handleDateChange(time) {
    this.setState({ tempTime: time })
  }

  handleApply() {
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
      timezone,
    } = this.props
    const {
      isOpen,
      tempSymbols,
      tempTime,
    } = this.state
    const { formatDate, parseDate } = momentFormatter(DEFAULT_DATETIME_FORMAT, timezone)
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
                  <DateInput
                    formatDate={formatDate}
                    parseDate={parseDate}
                    onChange={this.handleDateChange}
                    value={tempTime}
                  />
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
