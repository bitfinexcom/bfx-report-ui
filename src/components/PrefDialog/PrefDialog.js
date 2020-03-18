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
import { IconNames } from '@blueprintjs/icons'

import { platform } from 'var/config'
import DateFormatSelector from 'ui/DateFormatSelector'
import LangMenu from 'ui/LangMenu'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import { checkboxFieldStyle, dialogDescStyle, dialogFieldStyle } from 'ui/utils'

import { propTypes, defaultProps } from './PrefDialog.props'

class PrefDialog extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.switchDark = this.switchTheme.bind(this, 'bp3-dark')
    this.switchLight = this.switchTheme.bind(this, 'bp3-light')
    this.switchMidnight = this.switchTheme.bind(this, 'midnight')
  }

  switchTheme = (theme, e) => {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setTheme(theme)
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
      isPrefOpen,
      t,
      theme,
      timezone,
      inputTimezone,
    } = this.props
    if (!isPrefOpen) {
      return null
    }

    const renderThemeSwitcher = platform.hideSwitchTheme ? null : (
      <div className='row'>
        <div className={dialogDescStyle}>
          {t('preferences.theme')}
        </div>
        <div className={dialogFieldStyle}>
          <ButtonGroup>
            <Button
              name='light'
              text={t('theme.light')}
              onClick={this.switchLight}
              intent={theme.includes('light') ? Intent.PRIMARY : undefined}
            />
            <Button
              name='dark'
              text={t('theme.dark')}
              onClick={this.switchDark}
              intent={theme.includes('dark') ? Intent.PRIMARY : undefined}
            />
            <Button
              name='midnight'
              text={t('theme.midnight')}
              onClick={this.switchMidnight}
              intent={theme.includes('midnight') ? Intent.PRIMARY : undefined}
            />
          </ButtonGroup>
        </div>
      </div>
    )

    return (
      <Dialog
        icon={IconNames.PERSON}
        onClose={handlePrefDialogClose}
        title={t('preferences.title')}
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        isOpen={isPrefOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className='row'>
            <div className={dialogDescStyle}>
              {t('preferences.language')}
            </div>
            <div className={dialogFieldStyle}>
              <LangMenu />
            </div>
          </div>
          {renderThemeSwitcher}
          <div className='row'>
            <div className={dialogDescStyle}>
              {t('preferences.timezone')}
            </div>
            <div className={dialogFieldStyle}>
              <TimezonePicker
                showLocalTimezone
                value={timezone}
                onChange={this.handleTimezoneChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className={dialogDescStyle}>
              {t('preferences.timezone-input')}
            </div>
            <div className={dialogFieldStyle}>
              <TimezonePicker
                showLocalTimezone
                value={inputTimezone}
                onChange={this.handleInputTimezoneChange}
              />
            </div>
          </div>
          <div className='row'>
            <div className={dialogDescStyle}>
              {t('preferences.dateformat')}
            </div>
            <div className={dialogFieldStyle}>
              <DateFormatSelector />
            </div>
          </div>
          <div className='row'>
            <div className={dialogDescStyle}>
              {t('preferences.milliseconds')}
            </div>
            <div className={checkboxFieldStyle}>
              <ShowMilliseconds />
            </div>
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={handlePrefDialogClose}>
              {t('preferences.close')}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withTranslation('translations')(PrefDialog)
