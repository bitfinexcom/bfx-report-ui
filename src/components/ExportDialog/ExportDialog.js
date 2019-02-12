import React, { Fragment, PureComponent } from 'react'
import { withNamespaces } from 'react-i18next'
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

import { propTypes, defaultProps } from './ExportDialog.props'

class ExportDialog extends PureComponent {
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
    if (!isExportOpen) {
      return null
    }
    const isWallets = location && location.pathname && getTarget(location.pathname) === queryConstants.MENU_WALLETS
    const datetime = getFullTime(timestamp, true)
    const timeSpan = `${formatDate(start, timezone)} — ${formatDate(end, timezone)}`
    const intlType = t(`${type}.title`)
    const renderMessage = !email ? (
      <p>
        {t('timeframe.download.prepare', { intlType })}
        &nbsp;
        <span className='bitfinex-show-soft'>
          {isWallets ? datetime : timeSpan}
        </span>
        &nbsp;
        {t('timeframe.download.store', { intlType })}
      </p>
    ) : (
      <p>
        {t('timeframe.download.prepare', { intlType })}
        &nbsp;
        <span className='bitfinex-show-soft'>
          {isWallets ? datetime : timeSpan}
        </span>
        &nbsp;
        {t('timeframe.download.send', { intlType, email })}
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
                {t('timeframe.download.cancel')}
              </Button>
              <Button
                intent={Intent.PRIMARY}
                onClick={startExport}
              >
                {t('timeframe.download.export')}
              </Button>
            </div>
          </div>
        </Fragment>
      )

    return (
      <Dialog
        icon='cloud-download'
        onClose={handleExportDialogClose}
        title={t('timeframe.download.title')}
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

export default withNamespaces('translations')(ExportDialog)
