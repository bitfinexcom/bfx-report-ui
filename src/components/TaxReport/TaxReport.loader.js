import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Spinner } from '@blueprintjs/core'
import { isNil } from '@bitfinex/lib-js-util-base'

import { cancelTaxReportGeneration } from 'state/taxReport/actions'
import { getTransactionsGenerationProgress } from 'state/taxReport/selectors'

export const Loader = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const progress = useSelector(getTransactionsGenerationProgress)
  const spinnerContent = isNil(progress) ? '' : `${progress}%`
  const onCancel = () => dispatch(cancelTaxReportGeneration())

  return (
    <div className='loading-container'>
      <div className='spinner-wrapper'>
        <div className='loading-progress'>
          {spinnerContent}
        </div>
        <Spinner
          className='loading'
          size={Spinner.SIZE_STANDARD}
        />
      </div>
      <div className='loading-note'>
        <p>{t('taxreport.generation.title')}</p>
        <p>{t('taxreport.generation.note')}</p>
      </div>
      <Button
        onClick={() => onCancel()}
        className='loading-cancel-btn'
      >
        {t('framework.cancel')}
      </Button>
    </div>
  )
}

export default Loader
