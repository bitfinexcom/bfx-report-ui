import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'icons'

const Disclaimer = () => {
  const { t } = useTranslation()
  return (
    <div className='disclaimer'>
      <p className='disclaimer-header'>
        {t('taxreport.disclaimer.title')}
      </p>
      <div className='disclaimer-body'>
        {t('taxreport.disclaimer.message')}
        <div className='disclaimer-icon'>
          <Icon.CLOSE />
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
