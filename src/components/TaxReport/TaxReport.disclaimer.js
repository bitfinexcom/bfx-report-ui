import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Icon from 'icons'
import { setShowDisclaimer } from 'state/taxReport/actions'

const Disclaimer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const onClose = () => dispatch(setShowDisclaimer(false))

  return (
    <div className='disclaimer'>
      <p className='disclaimer-header'>
        {t('taxreport.disclaimer.title')}
      </p>
      <div className='disclaimer-body'>
        {t('taxreport.disclaimer.message')}
        <div onClick={onClose} className='disclaimer-icon'>
          <Icon.CLOSE />
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
