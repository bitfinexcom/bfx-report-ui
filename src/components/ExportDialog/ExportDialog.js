import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import DateFormatSelector from 'ui/DateFormatSelector'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import { formatDate } from 'state/utils'
import { getTarget } from 'state/query/utils'
import queryConstants from 'state/query/constants'

import ExportTargetsSelector from './ExportDialog.TargetsSelector'

class ExportDialog extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    start: PropTypes.number,
    end: PropTypes.number,
    email: PropTypes.string,
    toggleDialog: PropTypes.func.isRequired,
    exportCsv: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    getFullTime: PropTypes.func.isRequired,
    timestamp: PropTypes.number,
    timezone: PropTypes.string.isRequired,
  }

  static defaultProps = {
    start: 0,
    end: 0,
    email: '',
    timestamp: null,
  }

  state = {
    currentTargets: [],
    target: '',
    isOpen: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isOpen, prepareExport } = nextProps
    const { isOpen: isPrevOpen } = prevState

    if (!isPrevOpen && isOpen) {
      prepareExport()
    }

    const target = getTarget(nextProps.location.pathname)
    if (target !== prevState.target) {
      return {
        currentTargets: [target],
        target,
        isOpen,
      }
    }

    return {
      isOpen,
    }
  }

  startExport = () => {
    const { exportCsv, toggleDialog, location } = this.props
    const { currentTargets } = this.state
    const target = getTarget(location.pathname)
    const targets = queryConstants.MENU_POSITIONS_AUDIT !== target
      ? currentTargets
      : [queryConstants.MENU_POSITIONS_AUDIT]

    exportCsv(targets)
    toggleDialog()
  }

  toggleTarget = (target) => {
    const { currentTargets } = this.state

    if (!currentTargets.includes(target)) {
      this.setState({ currentTargets: [...currentTargets, target] })
      return
    }

    if (currentTargets.length !== 1) { // should keep at least 1 item
      this.setState({ currentTargets: currentTargets.filter(currentTarget => currentTarget !== target) })
    }
  }

  render() {
    const {
      t,
      end,
      email,
      start,
      isOpen,
      location,
      timezone,
      timestamp,
      getFullTime,
      toggleDialog,
    } = this.props
    const { currentTargets } = this.state
    if (!isOpen) {
      return null
    }
    const target = getTarget(location.pathname)
    const isWallets = location && location.pathname && target === queryConstants.MENU_WALLETS
    const datetime = getFullTime(timestamp, true, true)
    const timeSpan = `${formatDate(start, timezone)} — ${formatDate(end, timezone)}`
    const intlType = t(`${target}.title`)
    const renderMessage = !email ? (
      <>
        {t('download.prepare', { intlType })}
        {' '}
        <span className='bitfinex-show-soft'>
          {isWallets ? datetime : timeSpan}
        </span>
        {' '}
        {t('download.store', { intlType })}
      </>
    ) : (
      <>
        {t('download.prepare', { intlType })}
        {' '}
        <span className='bitfinex-show-soft'>
          {isWallets ? datetime : timeSpan}
        </span>
        {' '}
        {t('download.send', { intlType, email })}
      </>
    )

    return (
      <Dialog
        className='export-dialog'
        icon={<Icon.FILE_EXPORT />}
        isCloseButtonShown={false}
        isOpen={isOpen}
        onClose={toggleDialog}
        title={t('download.title')}
      >
        <div className={Classes.DIALOG_BODY}>
          <p className='export-dialog-notice'>
            {renderMessage}
          </p>
          <div className='export-dialog-row'>
            {queryConstants.MENU_POSITIONS_AUDIT !== target
            && (
              <div className='export-dialog-item'>
                <div>{t('download.targets')}</div>
                <ExportTargetsSelector
                  currentTargets={currentTargets}
                  toggleTarget={this.toggleTarget}
                />
              </div>
            )
            }
            <div className='export-dialog-item'>
              <div>{t('preferences.dateformat')}</div>
              <DateFormatSelector />
            </div>
          </div>
          <div className='export-dialog-row'>
            <span>{t('preferences.milliseconds')}</span>
            <ShowMilliseconds />
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={toggleDialog}>
              {t('download.cancel')}
            </Button>
            <Button
              intent={Intent.PRIMARY}
              disabled={queryConstants.MENU_POSITIONS_AUDIT !== target && currentTargets.length === 0}
              onClick={this.startExport}
            >
              {t('download.export')}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default ExportDialog
