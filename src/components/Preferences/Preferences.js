import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import LangMenu from 'ui/LangMenu'
import ThemeSwitcher from 'ui/ThemeSwitcher'
import TimezonePicker from 'ui/TimezonePicker'
import TableScrollPref from 'ui/TableScrollPref'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import DateFormatSelector from 'ui/DateFormatSelector'
import SyncAfterUpdatePref from 'ui/SyncAfterUpdatePref'
import TimeRangePreservePref from 'ui/TimeRangePreservePref'

const { showFrameworkMode } = config

const Preferences = ({
  t,
  isOpen,
  timezone,
  isSyncing,
  setTimezone,
  toggleDialog,
  removeAccount,
}) => {
  const showRemoveBtn = showFrameworkMode && !isSyncing

  return (
    <Dialog
      usePortal
      isOpen={isOpen}
      onClose={toggleDialog}
      className='preferences'
      isCloseButtonShown={false}
      title={t('preferences.title')}
      icon={<Icon.SLIDER_CIRCLE_H />}
    >
      <div className={Classes.DIALOG_BODY}>
        <div className='preferences-row'>
          <div className='preferences-item'>
            <div>{t('preferences.language')}</div>
            <LangMenu />
          </div>
        </div>
        <div className='preferences-row'>
          <div className='preferences-item'>
            <div>{t('preferences.theme')}</div>
            <ThemeSwitcher />
          </div>
        </div>
        <div className='preferences-row preferences-timezones'>
          <div className='preferences-item'>
            <div>{t('preferences.timezone')}</div>
            <TimezonePicker
              onChange={setTimezone}
              value={timezone}
            />
          </div>
          <div className='preferences-item'>
            <div>{t('preferences.dateformat')}</div>
            <DateFormatSelector />
          </div>
        </div>
        <div className='preferences-row'>
          <span>{t('preferences.milliseconds')}</span>
          <ShowMilliseconds />
        </div>
        <div className='preferences-row'>
          <span>{t('preferences.table_scroll')}</span>
          <TableScrollPref />
        </div>
        <div className='preferences-row'>
          <span>{t('preferences.preserve_timeframe')}</span>
          <TimeRangePreservePref />
        </div>
        {showFrameworkMode && (
          <div className='preferences-row'>
            <span>{t('preferences.sync_after_update')}</span>
            <SyncAfterUpdatePref />
          </div>
        )}
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <div className='remove-account-wrapper'>
            {showRemoveBtn && (
            <Button
              onClick={removeAccount}
              intent={Intent.PRIMARY}
            >
              {t('preferences.remove_account')}
            </Button>
            )}
          </div>
          <Button
            onClick={toggleDialog}
            intent={Intent.PRIMARY}
          >
            {t('preferences.close')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

Preferences.propTypes = {
  t: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  timezone: PropTypes.string.isRequired,
  setTimezone: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  removeAccount: PropTypes.func.isRequired,
}

export default memo(Preferences)
