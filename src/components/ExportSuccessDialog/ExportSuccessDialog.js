import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './ExportSuccessDialog.props'

class ExportSuccessDialog extends PureComponent {
  render() {
    const {
      isOpen, t, toggleDialog,
    } = this.props
    if (!isOpen) {
      return null
    }

    const message = platform.showFrameworkMode ? t('download.status.local') : t('download.status.email')

    return (
      <Dialog
        className='export-success-dialog'
        isCloseButtonShown={false}
        isOpen={isOpen}
        onClose={toggleDialog}
        title={t('download.success')}
      >
        <div className={Classes.DIALOG_BODY}>
          <Icon.CHECKED />
          <div className='export-success-dialog-message'>{message}</div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <Button intent={Intent.PRIMARY} onClick={toggleDialog}>
            {t('download.okay')}
          </Button>
        </div>
      </Dialog>
    )
  }
}

ExportSuccessDialog.propTypes = propTypes
ExportSuccessDialog.defaultProps = defaultProps

export default withTranslation('translations')(ExportSuccessDialog)
