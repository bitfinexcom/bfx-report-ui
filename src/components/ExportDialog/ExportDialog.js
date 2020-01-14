import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import DateFormatSelector from 'ui/DateFormatSelector'
import Loading from 'ui/Loading'
import { checkboxFieldStyle, dialogDescStyle, dialogFieldStyle } from 'ui/utils'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import { formatDate } from 'state/utils'
import { getTarget } from 'state/query/utils'
import queryConstants from 'state/query/constants'

import ExportTargetsSelector from './ExportDialog.TargetsSelector'
import { propTypes, defaultProps } from './ExportDialog.props'

class ExportDialog extends PureComponent {
  state = {
    currentTargets: [],
    target: '',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const target = getTarget(nextProps.location.pathname)
    if (target !== prevState.target) {
      return {
        currentTargets: [target],
        target,
      }
    }

    return null
  }

  toggleDialog = () => {
    const { isOpen, prepareExport, toggleDialog } = this.props
    if (!isOpen) {
      prepareExport()
    }
    toggleDialog()
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
      email,
      end,
      getFullTime,
      isOpen,
      loading,
      start,
      t,
      timestamp,
      timezone,
      location,
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
      <p>
        {t('download.prepare', { intlType })}
        {' '}
        <span className='bitfinex-show-soft'>
          {isWallets ? datetime : timeSpan}
        </span>
        {' '}
        {t('download.store', { intlType })}
      </p>
    ) : (
      <p>
        {t('download.prepare', { intlType })}
        {' '}
        <span className='bitfinex-show-soft'>
          {isWallets ? datetime : timeSpan}
        </span>
        {' '}
        {t('download.send', { intlType, email })}
      </p>
    )
    const renderContent = loading
      ? (
        <Fragment>
          <div className={Classes.DIALOG_BODY}>
            <Loading />
          </div>
          <div className={Classes.DIALOG_FOOTER} />
        </Fragment>
      )
      : (
        <Fragment>
          <div className={Classes.DIALOG_BODY}>
            {renderMessage}
            <br />
            {
              queryConstants.MENU_POSITIONS_AUDIT !== target
              && (
                <div className='row'>
                  <div className={dialogDescStyle}>
                    {t('download.targets')}
                  </div>
                  <div className={dialogFieldStyle}>
                    <ExportTargetsSelector
                      currentTargets={currentTargets}
                      toggleTarget={this.toggleTarget}
                    />
                  </div>
                </div>
              )
            }
            <div className='row'>
              <div className={dialogDescStyle}>
                {t('preferences.dateformat')}
              </div>
              <div className={dialogFieldStyle}>
                <DateFormatSelector />
              </div>
            </div>
            <div className='row'>
              <div className={dialogDescStyle}>
                {t('preferences.milliseconds')}
              </div>
              <div className={checkboxFieldStyle}>
                <ShowMilliseconds />
              </div>
            </div>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.toggleDialog}>
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
        </Fragment>
      )

    return (
      <Dialog
        icon={IconNames.CLOUD_DOWNLOAD}
        onClose={this.toggleDialog}
        title={t('download.title')}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isOpen}
      >
        {renderContent}
      </Dialog>
    )
  }
}

ExportDialog.propTypes = propTypes
ExportDialog.defaultProps = defaultProps

export default withTranslation('translations')(ExportDialog)
