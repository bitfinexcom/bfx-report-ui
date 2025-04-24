import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  Intent,
  Button,
  Classes,
} from '@blueprintjs/core'

import Icon from 'icons'
import {
  setShowCalcPrecisionModal,
  updateTaxReportTransactions,
} from 'state/taxReport/actions'
import {
  getTransactionsDelistedCurrencies,
  getTransactionsShowCalcPrecisionModal,
} from 'state/taxReport/selectors'

const TaxPrecisionDialog = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isOpen = useSelector(getTransactionsShowCalcPrecisionModal)
  const delistedTokens = useSelector(getTransactionsDelistedCurrencies).join(', ')

  const handleSubmit = useCallback(
    () => dispatch(setShowCalcPrecisionModal(false)),
    [dispatch],
  )

  const handleDecline = useCallback(
    () => {
      dispatch(setShowCalcPrecisionModal(false))
      dispatch(updateTaxReportTransactions([]))
    },
    [dispatch],
  )

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleSubmit}
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
          <Button intent={Intent.PRIMARY} onClick={handleSubmit}>
            { t('taxreport.precision_modal.ok')}
          </Button>
          <Button onClick={handleDecline}>
            { t('taxreport.precision_modal.decline')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default TaxPrecisionDialog
