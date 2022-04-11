import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'

const ExportSuccessDialog = ({
  t,
  isOpen,
  remoteUrn,
  toggleDialog,
  localExportPath,
}) => {
  if (!isOpen) {
    return null
  }

  const message = config.localExport
    ? (
      <>
        {t('download.status.local')}
        {remoteUrn
          ? (
            <a href={remoteUrn}>
              {t('download.remoteStorage')}
            </a>
          ) : (
            <span>
              {localExportPath}
            </span>
          )
        }
      </>
    )
    : t('download.status.email')

  return (
    <Dialog
      isOpen={isOpen}
      onClose={toggleDialog}
      isCloseButtonShown={false}
      title={t('download.success')}
      className='export-success-dialog'
    >
      <div className={Classes.DIALOG_BODY}>
        <Icon.CHECKED />
        <div className='export-success-dialog-message'>
          {message}
        </div>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <Button
          onClick={toggleDialog}
          intent={Intent.PRIMARY}
        >
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
