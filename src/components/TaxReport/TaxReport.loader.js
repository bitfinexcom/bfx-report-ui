import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Spinner } from '@blueprintjs/core'
import { isNil } from '@bitfinex/lib-js-util-base'

import { getTransactionsGenerationProgress } from 'state/taxReport/selectors'

export const Loader = () => {
  const { t } = useTranslation()
  const progress = useSelector(getTransactionsGenerationProgress)
  const spinnerContent = isNil(progress) ? '' : `${progress}%`

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
    </div>
  )
}

export default Loader
