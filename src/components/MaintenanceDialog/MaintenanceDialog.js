import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'

// const BFX_STATUS_LINK = 'https://bitfinex.statuspage.io/'

const MaintenanceDialog = ({

  isOpen,
}) => {
  const { t } = useTranslation()
  const isOpen = useSelector(getTimezone)

  return (
    <Dialog
      className='maintenance-dialog'
      icon={<Icon.INFO_CIRCLE />}
      title={t('maintenance.title')}
      isCloseButtonShown={false}
      isOpen={true}
    >
      <div className={Classes.DIALOG_BODY}>
        <div className='maintenance-dialog-message'>
          {errorMessage}
        </div>
      </div>
    </Dialog>
  )
}

export default MaintenanceDialog
