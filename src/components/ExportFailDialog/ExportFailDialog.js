import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import { tracker } from 'utils/trackers'

const ExportSuccessDialog = ({
  t,
  isOpen,
  toggleDialog,
}) => {
  if (!isOpen) {
    return null
  }

  const onClose = () => {
    tracker.trackEvent('Okay')
    toggleDialog()
  }

  return (
    <Dialog
      className='export-fail-dialog'
      isCloseButtonShown={false}
      isOpen={isOpen}
      onClose={onClose}
      title={t('download.fail')}
    >
      <div className={Classes.DIALOG_BODY}>
        <Icon.WARNING />
        <div className='export-fail-dialog-message'>
          {t('download.status.failed')}
        </div>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <Button intent={Intent.PRIMARY} onClick={onClose}>
          {t('download.okay')}
        </Button>
      </div>
    </Dialog>
  )
}

ExportSuccessDialog.propTypes = {
  remoteUrn: PropTypes.string,
  localExportPath: PropTypes.string,
  t: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}
ExportSuccessDialog.defaultProps = {
  remoteUrn: null,
  localExportPath: null,
}

export default memo(ExportSuccessDialog)
