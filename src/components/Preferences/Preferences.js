import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Classes,
  Dialog,
  ButtonGroup,
  Intent,
} from '@blueprintjs/core'
import { TimezonePicker } from '@blueprintjs/timezone'

import Icon from 'icons'
import { platform } from 'var/config'
import DateFormatSelector from 'ui/DateFormatSelector'
import LangMenu from 'ui/LangMenu'
import ShowMilliseconds from 'ui/ShowMilliseconds'

import { propTypes, defaultProps } from './Preferences.props'

class Preferences extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  switchTheme = (theme) => {
    const { setTheme } = this.props
    setTheme(theme)
  }

  handleTimezoneChange = (timezone) => {
    const { setTimezone } = this.props
    setTimezone(timezone)
  }

  handleInputTimezoneChange = (timezone) => {
    const { setInputTimezone } = this.props
    setInputTimezone(timezone)
  }

  render() {
    const {
      handlePrefDialogClose,
      isOpen,
      t,
      theme,
      timezone,
      inputTimezone,
    } = this.props

    const renderThemeSwitcher = platform.hideSwitchTheme ? null : (
      <ButtonGroup className='preferences-row preferences-theme'>
        <Button
          name='light'
          text={t('theme.light')}
          onClick={() => this.switchTheme('theme-light')}
          intent={theme.includes('light') ? Intent.PRIMARY : undefined}
        />
        <Button
          name='dark'
          text={t('theme.dark')}
          onClick={() => this.switchTheme('theme-dark')}
          intent={theme.includes('dark') ? Intent.PRIMARY : undefined}
        />
      </ButtonGroup>
    )

    return (
      <Dialog
        className='preferences'
        icon={<Icon.SLIDER_CIRCLE_H />}
        onClose={handlePrefDialogClose}
        title={t('preferences.title')}
        isCloseButtonShown={false}
        isOpen={isOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className='preferences-row preferences-item'>
            <div>{t('preferences.language')}</div>
            <LangMenu />
          </div>
          {renderThemeSwitcher}
          <div className='preferences-row preferences-timezones'>
            <div className='preferences-item'>
              <div>{t('preferences.timezone')}</div>
              <TimezonePicker
                buttonProps={{
                  className: 'timezone-picker',
                }}
                showLocalTimezone
                value={timezone}
                onChange={this.handleTimezoneChange}
              />
            </div>
            <div className='preferences-item'>
              <div>{t('preferences.timezone-input')}</div>
              <TimezonePicker
                buttonProps={{
                  className: 'timezone-picker',
                }}
                showLocalTimezone
                value={inputTimezone}
                onChange={this.handleInputTimezoneChange}
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
              onClick={handlePrefDialogClose}
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
