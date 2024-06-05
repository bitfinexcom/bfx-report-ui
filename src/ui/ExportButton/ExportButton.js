import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import { tracker } from 'utils/trackers'
import { toggleExportDialog } from 'state/ui/actions'

const ExportButton = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleClick = () => {
    tracker.trackEvent('Export')
    dispatch(toggleExportDialog())
  }

  return (
    <Button icon={IconNames.CLOUD_DOWNLOAD} onClick={handleClick}>
      {t('download.export')}
    </Button>
  )
}

export default ExportButton
