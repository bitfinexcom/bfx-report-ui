import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import Icon from 'icons'
import DateFormatSelector from 'ui/DateFormatSelector'
import LangMenu from 'ui/LangMenu'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import TimezonePicker from 'ui/TimezonePicker'
import ThemeSwitcher from 'ui/ThemeSwitcher'

import { propTypes, defaultProps } from './Preferences.props'

class Preferences extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  render() {
    const {
      inputTimezone,
      isOpen,
      setTimezone,
      setInputTimezone,
      t,
      timezone,
      toggleDialog,
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
          <div className='preferences-row preferences-item'>
            <div>{t('preferences.language')}</div>
            <LangMenu />
          </div>
          <div className='preferences-row preferences-item'>
            <div>{t('preferences.theme')}</div>
            <ThemeSwitcher />
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
              <div>{t('preferences.timezone-input')}</div>
              <TimezonePicker
                onChange={setInputTimezone}
                value={inputTimezone}
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
  }
}

export default withTranslation('translations')(Preferences)
