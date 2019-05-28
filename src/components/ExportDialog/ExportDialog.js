import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import DateFormatSelector from 'ui/DateFormatSelector'
import Loading from 'ui/Loading'
import {
  checkboxFieldStyle,
  dialogDescStyle,
  dialogFieldStyle,
  dialogSmallDescStyle,
} from 'ui/utils'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import { formatDate } from 'state/utils'
import { getTarget } from 'state/query/utils'
import queryConstants from 'state/query/constants'

import ExportTargetsSelector from './ExportTargetsSelector'
import { propTypes, defaultProps } from './ExportDialog.props'

class ExportDialog extends PureComponent {
  constructor(props) {
    super()

    const { type } = props
    this.state = {
      currentTargets: [type],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { type } = this.props

    if (type !== nextProps.type) {
      this.setState({
        currentTargets: [nextProps.type],
      })
    }
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
      handleExportDialogClose,
      isExportOpen,
      loading,
      start,
      startExport,
      t,
      type,
      timestamp,
      timezone,
      location,
    } = this.props
    const { currentTargets } = this.state
    if (!isExportOpen) {
      return null
    }
    const isWallets = location && location.pathname && getTarget(location.pathname) === queryConstants.MENU_WALLETS
    const datetime = getFullTime(timestamp, true)
    const timeSpan = `${formatDate(start, timezone)} — ${formatDate(end, timezone)}`
    const intlType = t(`${type}.title`)
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
              queryConstants.MENU_POSITIONS_AUDIT !== type
              && (
                <div className='row'>
                  <div className={dialogDescStyle}>
                    {t('download.targets')}
                  </div>
                  <div className={dialogSmallDescStyle}>
                    {t('download.targets')}
                  </div>
                  <div className={checkboxFieldStyle}>
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
              <div className={dialogSmallDescStyle}>
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
              <div className={dialogSmallDescStyle}>
                {t('preferences.milliseconds')}
              </div>
              <div className={checkboxFieldStyle}>
                <ShowMilliseconds />
              </div>
            </div>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={handleExportDialogClose}>
                {t('download.cancel')}
              </Button>
              <Button
                intent={Intent.PRIMARY}
                disabled={queryConstants.MENU_POSITIONS_AUDIT !== type && currentTargets.length === 0}
                onClick={startExport(queryConstants.MENU_POSITIONS_AUDIT !== type
                  ? currentTargets : [queryConstants.MENU_POSITIONS_AUDIT])}
              >
                {t('download.export')}
              </Button>
            </div>
          </div>
        </Fragment>
      )

    return (
      <Dialog
        icon='cloud-download'
        onClose={handleExportDialogClose}
        title={t('download.title')}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isExportOpen}
      >
        {renderContent}
      </Dialog>
    )
  }
}

ExportDialog.propTypes = propTypes
ExportDialog.defaultProps = defaultProps

export default withTranslation('translations')(ExportDialog)
