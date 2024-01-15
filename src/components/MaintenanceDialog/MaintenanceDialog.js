import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Classes,
  Dialog,
} from '@blueprintjs/core'

import Icon from 'icons'
import { getShowMaintenanceModal } from 'state/base/selectors'

const BFX_STATUS_LINK = 'https://bitfinex.statuspage.io/'

const MaintenanceDialog = () => {
  const { t } = useTranslation()
  const isOpen = useSelector(getShowMaintenanceModal)

  return (
    <Dialog
      isOpen={isOpen}
      icon={<Icon.INFO_CIRCLE />}
      title={t('maintenance.title')}
      className='maintenance-dialog'
      isCloseButtonShown={false}
    >
      <div className={Classes.DIALOG_BODY}>
        <div className='maintenance-dialog-message'>
          <span>{t('maintenance.message_1')}</span>
          <br />
          <span>{t('maintenance.message_2')}</span>
          <a
            target='_blank'
            href={BFX_STATUS_LINK}
            rel='noopener noreferrer'
          >
            bitfinex.statuspage.io
          </a>
          <span>{t('maintenance.message_3')}</span>
          <br />
          <span>{t('maintenance.message_4')}</span>
        </div>
      </div>
    </Dialog>
  )
}

export default MaintenanceDialog
