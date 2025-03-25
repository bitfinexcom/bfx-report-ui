import React from 'react'
import { useTranslation } from 'react-i18next'

export const InitSyncNote = () => {
  const { t } = useTranslation()

  return (
    <div className='init-sync-note-container'>
      <div className='init-sync-note'>
        <p>{t('sync.init-sync-info.note_1')}</p>
        <p>{t('sync.init-sync-info.note_2')}</p>
      </div>
    </div>
  )
}

export default InitSyncNote
