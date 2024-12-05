import React from 'react'
import { useTranslation } from 'react-i18next'

export const SyncNote = () => {
  const { t } = useTranslation()

  return (
    <div className='sync-note-container'>
      <div className='sync-note'>
        <p>{t('taxreport.generation.sync_1')}</p>
        <p>{t('taxreport.generation.sync_2')}</p>
      </div>
    </div>
  )
}

export default SyncNote
