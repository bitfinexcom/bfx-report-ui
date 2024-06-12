import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Icon from 'icons'
import { tracker } from 'utils/trackers'
import { toggleExportDialog } from 'state/ui/actions'

const Export = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const toggleExport = () => {
    tracker.trackEvent('Export', 'Navigation')
    dispatch(toggleExportDialog())
  }

  return (
    <div
      className='export'
      onClick={toggleExport}
    >
      <Icon.FILE_EXPORT />
      <span>
        {t('download.export')}
      </span>
    </div>
  )
}

export default Export
