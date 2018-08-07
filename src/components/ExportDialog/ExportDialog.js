import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './ExportDialog.props'

class ExportDialog extends PureComponent {
  render() {
    const {
      end,
      handleExportDialogClose,
      intl,
      isExportOpen,
      start,
      startExport,
      type,
    } = this.props
    if (!isExportOpen) {
      return null
    }

    const intlType = intl.formatMessage({ id: `${type}.title` })
    return (
      <Dialog
        icon='cloud-download'
        onClose={handleExportDialogClose}
        title={intl.formatMessage({ id: 'timeframe.download.title' })}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isExportOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          {intl.formatMessage({ id: 'timeframe.download.prepare' }, { intlType })}
          &nbsp;
          <span className='bitfinex-show-soft'>
            {`${formatDate(start)} — ${formatDate(end)}`}
          </span>
          &nbsp;
          {intl.formatMessage({ id: 'timeframe.download.send' }, { intlType })}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={handleExportDialogClose}>
              {intl.formatMessage({ id: 'timeframe.download.cancel' })}
            </Button>
            <Button
              intent={Intent.PRIMARY}
              onClick={startExport}
            >
              {intl.formatMessage({ id: 'timeframe.download.export' })}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

ExportDialog.propTypes = propTypes
ExportDialog.defaultProps = defaultProps

export default injectIntl(ExportDialog)
