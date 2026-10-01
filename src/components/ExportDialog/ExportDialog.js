import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
  Spinner,
} from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import { tracker } from 'utils/trackers'
import { formatDate } from 'state/utils'
import { getTarget } from 'state/query/utils'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import queryConstants from 'state/query/constants'
import DateFormatSelector from 'ui/DateFormatSelector'
import ExportTypeSelector from 'ui/ExportTypeSelector'

import { getShowPdfSwitcher } from './ExportDialog.helpers'
import ExportTargetsSelector from './ExportDialog.TargetsSelector'

const { isElectronApp, showFrameworkMode } = config

class ExportDialog extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    start: PropTypes.number,
    end: PropTypes.number,
    email: PropTypes.string,
    toggleDialog: PropTypes.func.isRequired,
    exportReport: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    getFullTime: PropTypes.func.isRequired,
    timestamp: PropTypes.number,
    timezone: PropTypes.string.isRequired,
    isExporting: PropTypes.bool,
    reportFolderWritePerm: PropTypes.shape({
      invalidPath: PropTypes.bool,
      noWritePerm: PropTypes.bool,
      reportFilePath: PropTypes.string,
    }),
  }

  static defaultProps = {
    start: 0,
    end: 0,
    email: '',
    timestamp: null,
    isExporting: false,
    reportFolderWritePerm: null,
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
    const { exportReport, location } = this.props
    const { currentTargets } = this.state
    tracker.trackEvent('Export')
    const target = getTarget(location.pathname)
    const targets = queryConstants.MENU_POSITIONS_AUDIT !== target
      ? currentTargets
      : [queryConstants.MENU_POSITIONS_AUDIT]

    exportReport(targets)
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

  onCancel = () => {
    const { toggleDialog } = this.props
    tracker.trackEvent('Cancel')
    toggleDialog()
  }

  renderFolderPermError = () => {
    const { t, isOpen, reportFolderWritePerm } = this.props
    const { reportFilePath } = reportFolderWritePerm ?? {}

    return (
      <Dialog
        className='export-dialog'
        icon={<Icon.FILE_EXPORT />}
        isCloseButtonShown={false}
        isOpen={isOpen}
        onClose={this.onCancel}
        title={t('download.title')}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className='export-dialog-perm-error'>
            <Icon.WARNING />
            <p className='export-dialog-perm-error-title'>
              {t('download.folderPerm.title')}
            </p>
            <p>{t('download.folderPerm.noAccess')}</p>
            <p className='export-dialog-perm-error-path'>
              {reportFilePath}
            </p>
            <p>{t('download.folderPerm.hint')}</p>
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className='export-dialog-perm-error-actions'>
            <Button onClick={this.onCancel}>
              {t('download.cancel')}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }

  render() {
    const {
      t,
      end,
      email,
      start,
      isOpen,
      isExporting,
      location,
      timezone,
      timestamp,
      getFullTime,
      reportFolderWritePerm,
    } = this.props
    const { currentTargets } = this.state
    if (!isOpen) {
      return null
    }
    const { invalidPath, noWritePerm } = reportFolderWritePerm ?? {}
    if (isElectronApp && (invalidPath || noWritePerm)) {
      return this.renderFolderPermError()
    }
    const showPdfSwitcher = getShowPdfSwitcher(currentTargets)
    const showLoader = showFrameworkMode && isExporting
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
        onClose={this.onCancel}
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
          {showPdfSwitcher && (
            <div className='export-dialog-row'>
              <div className='export-dialog-item'>
                <div>{t('download.exportFormat')}</div>
                <ExportTypeSelector />
              </div>
            </div>
          )}
          <div className='export-dialog-row'>
            <div className='export-dialog-item'>
              <span>{t('preferences.milliseconds')}</span>
              <ShowMilliseconds />
            </div>
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.onCancel}>
              {t('download.cancel')}
            </Button>
            <Button
              intent={Intent.PRIMARY}
              disabled={queryConstants.MENU_POSITIONS_AUDIT !== target && currentTargets.length === 0}
              onClick={this.startExport}
            >
              {showLoader
                ? <Spinner size={20} />
                : <>{t('download.export') }</>
              }
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default ExportDialog
