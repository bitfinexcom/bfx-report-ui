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
import {
  getTransactionsDelistedCurrencies,
  getTransactionsShowCalcPrecisionModal,
} from 'state/taxReport/selectors'

// import { FIRST_SYNC_ERROR } from './ErrorDialog.constants'

const TaxPrecisionDialog = () => {
  const { t } = useTranslation()
  const isOpen = useSelector(getTransactionsShowCalcPrecisionModal)
  const delistedTokens = useSelector(getTransactionsDelistedCurrencies)

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

  // const tokens = ['MTO', ' TERRAUST']

  return (
    <Dialog
      isOpen
      // onClose={handleClose}
      icon={<Icon.INFO_CIRCLE />}
      isCloseButtonShown={false}
      title={t('framework.warning')}
      className='tax-precision-dialog'
    >
      <div className={Classes.DIALOG_BODY}>
        <div className='tax-precision-dialog-message'>
          <p>{t('taxreport.precision_modal.message_1', { delistedTokens })}</p>
          <p>{t('taxreport.precision_modal.message_2')}</p>
        </div>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button intent={Intent.PRIMARY} onClick={() => {}}>
            { t('taxreport.precision_modal.ok')}
          </Button>
          <Button onClick={() => {}}>
            { t('taxreport.precision_modal.decline')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default TaxPrecisionDialog
