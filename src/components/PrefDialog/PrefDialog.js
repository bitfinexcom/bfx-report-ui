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

import { platform } from 'var/config'
import DateFormatSelector from 'ui/DateFormatSelector'
import LangMenu from 'ui/LangMenu'
import ShowMilliseconds from 'ui/ShowMilliseconds'
import {
  checkboxFieldStyle,
  dialogDescStyle,
  dialogFieldStyle,
  dialogSmallDescStyle,
} from 'ui/utils'

import { propTypes, defaultProps } from './PrefDialog.props'

class PrefDialog extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.switchDark = this.switchTheme.bind(this, 'bp3-dark')
    this.switchLight = this.switchTheme.bind(this, 'bp3-light')
    this.handleTimezoneChange = this.handleTimezoneChange.bind(this)
  }

  switchTheme(theme, e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setTheme(theme)
  }

  handleTimezoneChange(timezone) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setTimeZone(timezone)
  }

  render() {
    const {
      handlePrefDialogClose,
      isPrefOpen,
      t,
      theme,
      timezone,
    } = this.props
    if (!isPrefOpen) {
      return null
    }

    const renderThemeSwitcher = platform.hideSwitchTheme ? null : (
      <div className='row'>
        <div className={dialogDescStyle}>
          {t('preferences.theme')}
        </div>
        <div className={dialogSmallDescStyle}>
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
          </ButtonGroup>
        </div>
      </div>
    )

    return (
      <Dialog
        icon='person'
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
            <div className={dialogSmallDescStyle}>
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
            <div className={dialogSmallDescStyle}>
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
              {t('preferences.dateformat')}
            </div>
            <div className={dialogSmallDescStyle}>
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
            <div className={dialogSmallDescStyle}>
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
