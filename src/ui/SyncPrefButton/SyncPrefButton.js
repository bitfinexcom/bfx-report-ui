import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
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
import { IconNames } from '@blueprintjs/icons'

import DateInput from 'ui/DateInput'
import MultiPairSelector from 'ui/MultiPairSelector'
import mode from 'state/sync/constants'
import { dialogDescStyle, dialogFieldStyle } from 'ui/utils'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './SyncPrefButton.props'

class SyncPrefButton extends PureComponent {
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
    const { syncPairs, startTime } = this.props

    return {
      isOpen: false,
      pairs: syncPairs,
      start: startTime,
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
      syncMode,
      syncPairs,
      t,
      textOnly,
      startTime,
    } = this.props
    const {
      isOpen,
      pairs,
      start,
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
                <div className={dialogFieldStyle}>
                  <MultiPairSelector
                    currentFilters={pairs}
                    existingPairs={syncPairs}
                    togglePair={this.togglePair}
                  />
                </div>
              </div>
              <div className='row'>
                <div className={dialogDescStyle}>
                  {t('preferences.sync.starttime')}
                </div>
                <div className={dialogFieldStyle}>
                  <DateInput key={startTime} onChange={this.handleDateChange} defaultValue={startTime} />
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
                  <AnchorButton
                    onClick={this.handleApply}
                    intent={Intent.PRIMARY}
                    disabled={(
                      syncMode === mode.MODE_SYNCING
                      || !pairs.length
                      || !start
                    )}
                  >
                    {t('preferences.sync.btn-apply')}
                  </AnchorButton>
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
