import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import { tracker } from 'utils/trackers'
import { toggleExportFailDialog } from 'state/ui/actions'
import { getIsExportFailDialogOpen } from 'state/ui/selectors'

const ExportFailDialog = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isOpen = useSelector(getIsExportFailDialogOpen)

  const onClose = () => {
    tracker.trackEvent('Okay')
    dispatch(toggleExportFailDialog())
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('download.fail')}
      isCloseButtonShown={false}
      className='export-fail-dialog'
    >
      <div className={Classes.DIALOG_BODY}>
        <Icon.WARNING />
        <div className='export-fail-dialog-message'>
          {t('download.status.failed')}
        </div>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <Button
          onClick={onClose}
          intent={Intent.PRIMARY}
        >
          {t('download.okay')}
        </Button>
      </div>
    </Dialog>
  )
}

export default ExportFailDialog
