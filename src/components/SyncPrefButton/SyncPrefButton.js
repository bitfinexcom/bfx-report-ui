import React, { PureComponent, Fragment } from 'react'
import { injectIntl } from 'react-intl'
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
import MultiPairSelector from 'ui/MultiPairSelector'
import { parsePairTag } from 'state/symbols/utils'
import mode from 'state/sync/constants'
import { dialogDescStyle, dialogFieldStyle, dialogSmallDescStyle } from 'ui/utils'
import { DATE_FORMAT } from 'state/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './SyncPrefButton.props'

const ICON = 'issue-new'

const initState = {
  isOpen: false,
  tempPairs: [],
  tempTime: undefined,
}

class SyncPrefButton extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.addPair = this.addPair.bind(this)
    this.handleTagRemove = this.handleTagRemove.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleApply = this.handleApply.bind(this)
  }

  state = initState

  static getDerivedStateFromProps(nextProps, prevState) {
    // fill init state from props
    if (prevState.tempPairs.length === 0 || prevState.tempTime === undefined) {
      return {
        tempPairs: nextProps.syncPairs,
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

  addPair(pair) {
    return () => {
      const { tempPairs } = this.state
      if (!tempPairs.includes(pair)) {
        this.setState({ tempPairs: [...tempPairs, pair] })
      }
    }
  }

  handleTagRemove(tag) {
    const { tempPairs } = this.state
    const parsedTag = parsePairTag(tag)
    if (tempPairs.includes(parsedTag)) {
      const pairs = tempPairs.filter(pair => pair !== parsedTag)
      this.setState({ tempPairs: pairs })
    }
  }

  handleDateChange(time) {
    this.setState({ tempTime: time })
  }

  handleApply() {
    const { tempPairs, tempTime } = this.state
    const { logout, setSyncPref } = this.props
    setSyncPref(tempPairs, tempTime)
    this.setState({ isOpen: false })
    logout()
  }

  render() {
    const {
      intl,
      textOnly,
      syncMode,
      syncPairs,
    } = this.props
    const {
      isOpen,
      tempPairs,
      tempTime,
    } = this.state
    const renderInSyncWarning = syncMode === mode.MODE_SYNCING
      ? (
        <Fragment>
          <Callout intent={Intent.WARNING}>
            {intl.formatMessage({ id: 'preferences.sync.insync-warning' })}
          </Callout>
          <br />
        </Fragment>
      )
      : null
    return platform.showSyncMode
      ? (
        <Fragment>
          &nbsp;
          <Tooltip
            content={(
              <span>
                {intl.formatMessage({ id: 'preferences.sync.title' })}
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
              {textOnly ? intl.formatMessage({ id: 'preferences.sync.title' }) : ''}
            </Button>
          </Tooltip>
          <Dialog
            icon={ICON}
            onClose={this.handleClose}
            title={intl.formatMessage({ id: 'preferences.sync.title' })}
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
                  {intl.formatMessage({ id: 'preferences.sync.pairs' })}
                </div>
                <div className={dialogSmallDescStyle}>
                  {intl.formatMessage({ id: 'preferences.sync.pairs' })}
                </div>
                <div className={dialogFieldStyle}>
                  <MultiPairSelector
                    currentFilters={tempPairs}
                    existingPairs={syncPairs}
                    onPairSelect={this.addPair}
                    handleTagRemove={this.handleTagRemove}
                  />
                </div>
              </div>
              <div className='row'>
                <div className={dialogDescStyle}>
                  {intl.formatMessage({ id: 'preferences.sync.starttime' })}
                </div>
                <div className={dialogSmallDescStyle}>
                  {intl.formatMessage({ id: 'preferences.sync.starttime' })}
                </div>
                <div className={dialogFieldStyle}>
                  <DateInput
                    formatDate={DATE_FORMAT.formatDate}
                    parseDate={DATE_FORMAT.parseDate}
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
                      {intl.formatMessage({ id: 'preferences.sync.apply.tooltip' })}
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
                      || tempPairs.length === 0
                      || tempTime === undefined
                    )}
                  >
                    {intl.formatMessage({ id: 'preferences.sync.apply' })}
                  </Button>
                </Tooltip>
                <Button onClick={this.handleClose}>
                  {intl.formatMessage({ id: 'preferences.close' })}
                </Button>
              </div>
            </div>
          </Dialog>
        </Fragment>
      )
      : null
  }
}

export default injectIntl(SyncPrefButton)
