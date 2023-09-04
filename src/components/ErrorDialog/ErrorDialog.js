import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import _isEqual from 'lodash/isEqual'

import Icon from 'icons'

import { FIRST_SYNC_MESSAGE } from './ErrorDialog.constants'

const ErrorDialog = ({
  t,
  isOpen,
  isSyncing,
  startSync,
  isDisabled,
  errorMessage,
  toggleDialog,
  disableDialog,
}) => {
  const [isDialogDisabled, setIsDialogDisabled] = useState(isDisabled)
  const isFirstSync = _isEqual(FIRST_SYNC_MESSAGE, errorMessage)
  const shouldStartSync = isFirstSync && isOpen && !isSyncing

  const handleClose = () => {
    toggleDialog(false)
    disableDialog(isDialogDisabled)
  }

  const handleChange = (e) => {
    const { checked } = e.target
    setIsDialogDisabled(checked)
  }

  return (
    <Dialog
      className='error-dialog'
      icon={<Icon.INFO_CIRCLE />}
      onClose={handleClose}
      title={isFirstSync ? t('framework.sync-in-progress') : t('framework.warning')}
      isCloseButtonShown={false}
      isOpen={isOpen}
    >
      <div className={Classes.DIALOG_BODY}>
        <div className='error-dialog-message'>
          {isFirstSync ? t('framework.first-sync-message') : errorMessage }
        </div>
        <Checkbox
          checked={isDialogDisabled}
          onChange={handleChange}
          label={t('framework.notagain')}
          className='error-dialog-checkbox'
        />
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent={Intent.PRIMARY} onClick={handleClose}>
            {isFirstSync ? t('framework.okay_btn') : t('framework.continue')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

ErrorDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  startSync: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  disableDialog: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  t: PropTypes.func.isRequired,
}

ErrorDialog.defaultProps = {
  errorMessage: 'Something went wrong',
}

export default memo(ErrorDialog)
