import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import DateFormatSelector from 'ui/DateFormatSelector'
import LangMenu from 'ui/LangMenu'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import TableScrollPref from 'ui/TableScrollPref'
import TimeRangePreservePref from 'ui/TimeRangePreservePref'
import TimezonePicker from 'ui/TimezonePicker'
import ThemeSwitcher from 'ui/ThemeSwitcher'

class Preferences extends PureComponent {
  static propTypes = {
    setTimezone: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    timezone: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleDialog: PropTypes.func.isRequired,
    removeAccount: PropTypes.func.isRequired,
  }

  render() {
    const {
      isOpen,
      setTimezone,
      t,
      timezone,
      toggleDialog,
      removeAccount,
    } = this.props

    return (
      <Dialog
        className='preferences'
        icon={<Icon.SLIDER_CIRCLE_H />}
        onClose={toggleDialog}
        title={t('preferences.title')}
        isCloseButtonShown={false}
        isOpen={isOpen}
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
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <div className='remove-account-wrapper'>
              {config.showFrameworkMode && (
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
}

export default Preferences
