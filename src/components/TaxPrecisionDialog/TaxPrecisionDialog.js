import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  Intent,
  Button,
  Classes,
} from '@blueprintjs/core'
// import { isEqual } from '@bitfinex/lib-js-util-base'

import Icon from 'icons'
import { getTransactionsShowCalcPrecisionModal } from 'state/taxReport/selectors'

// import { FIRST_SYNC_ERROR } from './ErrorDialog.constants'

const TaxPrecisionDialog = () => {
  const { t } = useTranslation()
  const isOpen = useSelector(getTransactionsShowCalcPrecisionModal)

  // const handleClose = () => {
  //   tracker.trackEvent('Okay')
  //   toggleDialog(false)
  //   disableDialog(isDialogDisabled)
  // }

  // const handleChange = (e) => {
  //   tracker.trackEvent('Don\'t show this message again')
  //   const { checked } = e.target
  //   setIsDialogDisabled(checked)
  // }

  return (
    <Dialog
      isOpen={isOpen}
      // onClose={handleClose}
      icon={<Icon.INFO_CIRCLE />}
      isCloseButtonShown={false}
      title={t('framework.warning')}
      className='tax-precision-dialog'
    >
      <div className={Classes.DIALOG_BODY}>
        <div className='error-dialog-message'>
          {isFirstSync ? t('framework.first-sync-message') : errorMessage}
        </div>
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

export default TaxPrecisionDialog
