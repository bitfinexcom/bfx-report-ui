import React from 'react'

import { useTranslation } from 'react-i18next'

import Icon from 'icons'

const REPORTS_LINK = 'https://reporting.bitfinex.com/'

const LimitNote = () => {
  const { t } = useTranslation()
  return (
    <div className='limit-note'>
      <div className='limit-note--icon'>
        <Icon.INFO_CIRCLE />
      </div>
      <div className='limit-note--text'>
        <p className='limit-note--header'>
          {t('weightedaverages.limitNote.title')}
        </p>
        <div className='limit-note--body'>
          {t('weightedaverages.limitNote.note1')}
          <br />
          <a
            target='_blank'
            href={REPORTS_LINK}
            rel='noopener noreferrer'
            className='limit-note--body-link'
          >
            {t('weightedaverages.limitNote.link')}
          </a>
          {t('weightedaverages.limitNote.note2')}
        </div>
      </div>
    </div>
  )
}

export default LimitNote
