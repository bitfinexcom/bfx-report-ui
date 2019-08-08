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
import { IconNames } from '@blueprintjs/icons'

import DateInput from 'ui/DateInput'
import MultiPairSelector from 'ui/MultiPairSelector'
import mode from 'state/sync/constants'
import { dialogDescStyle, dialogFieldStyle, dialogSmallDescStyle } from 'ui/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './SyncPrefButton.props'

const initState = {
  isOpen: false,
  tempPairs: [],
  tempTime: undefined,
}

class SyncPrefButton extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  state = initState

  static getDerivedStateFromProps(nextProps, prevState) {
    // fill init state from props
    if (prevState.tempPairs.length === 0 || prevState.tempTime === undefined) {
      return {
        tempPairs: nextProps.syncPairs.map(pair => pair.toUpperCase()),
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

  togglePair = (pair) => {
    const { tempPairs } = this.state
    if (tempPairs.includes(pair)) {
      const pairs = tempPairs.filter(tempPair => tempPair !== pair)
      this.setState({ tempPairs: pairs })
    } else {
      this.setState({ tempPairs: [...tempPairs, pair] })
    }
  }

  handleDateChange = (time) => {
    this.setState({ tempTime: time })
  }

  handleApply = () => {
    const { tempPairs, tempTime } = this.state
    const { setSyncPref } = this.props
    this.setState({ isOpen: false })
    setSyncPref(tempPairs, tempTime, true)
  }

  render() {
    const {
      syncMode,
      syncPairs,
      t,
      textOnly,
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
            {t('preferences.sync.insync-warning')}
          </Callout>
          <br />
        </Fragment>
      )
      : null
    return platform.showFrameworkMode
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
              icon={textOnly ? null : IconNames.ISSUE_NEW}
              onClick={this.handleOpen}
              intent={Intent.PRIMARY}
            >
              {textOnly ? t('preferences.sync.title') : ''}
            </Button>
          </Tooltip>
          <Dialog
            icon={IconNames.ISSUE_NEW}
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
                  {t('preferences.sync.pairs')}
                </div>
                <div className={dialogSmallDescStyle}>
                  {t('preferences.sync.pairs')}
                </div>
                <div className={dialogFieldStyle}>
                  <MultiPairSelector
                    currentFilters={tempPairs}
                    existingPairs={syncPairs}
                    togglePair={this.togglePair}
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
                      || tempPairs.length === 0
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

export default withTranslation('translations')(SyncPrefButton)
