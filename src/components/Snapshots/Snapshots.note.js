import React from 'react'
import { useTranslation } from 'react-i18next'

export const GenerationNote = () => {
  const { t } = useTranslation()

  return (
    <div className='init-sync-note-container'>
      <div className='init-sync-note'>
        <p>{t('snapshots.generation.note_1')}</p>
        <p>{t('snapshots.generation.note_2')}</p>
      </div>
    </div>
  )
}

export default GenerationNote
