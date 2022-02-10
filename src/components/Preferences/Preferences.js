import React from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import LangMenu from 'ui/LangMenu'
import ThemeSwitcher from 'ui/ThemeSwitcher'
import TimezonePicker from 'ui/TimezonePicker'
import TableScrollPref from 'ui/TableScrollPref'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import DateFormatSelector from 'ui/DateFormatSelector'
import TimeRangePreservePref from 'ui/TimeRangePreservePref'

import { propTypes, defaultProps } from './Preferences.props'

const Preferences = ({
  t,
  isOpen,
  timezone,
  setTimezone,
  toggleDialog,
  inputTimezone,
  setInputTimezone,
}) => (
  <Dialog
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
          <div>
            {t('preferences.language')}
          </div>
          <LangMenu />
        </div>
      </div>
      <div className='preferences-row'>
        <div className='preferences-item'>
          <div>
            {t('preferences.theme')}
          </div>
          <ThemeSwitcher />
        </div>
      </div>
      <div className='preferences-row preferences-timezones'>
        <div className='preferences-item'>
          <div>
            {t('preferences.timezone')}
          </div>
          <TimezonePicker
            value={timezone}
            onChange={setTimezone}
          />
        </div>
        <div className='preferences-item'>
          <div>
            {t('preferences.timezone-input')}
          </div>
          <TimezonePicker
            onChange={setInputTimezone}
            value={inputTimezone}
          />
        </div>
        <div className='preferences-item'>
          <div>
            {t('preferences.dateformat')}
          </div>
          <DateFormatSelector />
        </div>
      </div>
      <div className='preferences-row'>
        <span>
          {t('preferences.milliseconds')}
        </span>
        <ShowMilliseconds />
      </div>
      <div className='preferences-row'>
        <span>
          {t('preferences.table_scroll')}
        </span>
        <TableScrollPref />
      </div>
      <div className='preferences-row'>
        <span>
          {t('preferences.preserve_timeframe')}
        </span>
        <TimeRangePreservePref />
      </div>
    </div>
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
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

Preferences.propTypes = propTypes

Preferences.defaultProps = defaultProps


export default withTranslation('translations')(Preferences)
