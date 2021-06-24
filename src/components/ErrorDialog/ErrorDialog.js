import React, { memo, useState } from 'react'
import {
  Button,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'

import { propTypes, defaultProps } from './ErrorDialog.props'

const ErrorDialog = ({
  t,
  isOpen,
  isDisabled,
  errorMessage,
  toggleDialog,
  disableDialog,
}) => {
  const [isDialogDisabled, setIsDialogDisabled] = useState(isDisabled)

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
      title={t('framework.warning')}
      isCloseButtonShown={false}
      isOpen={isOpen}
    >
      <div className={Classes.DIALOG_BODY}>
        <div className='error-dialog-message'>{errorMessage}</div>
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
            {t('framework.continue')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

ErrorDialog.propTypes = propTypes
ErrorDialog.defaultProps = defaultProps

export default memo(ErrorDialog)
