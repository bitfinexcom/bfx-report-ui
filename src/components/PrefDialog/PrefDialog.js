import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Classes,
  Dialog,
  ButtonGroup,
  Intent,
} from '@blueprintjs/core'
import { TimezonePicker } from '@blueprintjs/timezone'

import LangMenu from 'components/LangMenu'
import { dialogDescStyle, dialogFieldStyle, dialogSmallDescStyle } from 'ui/utils'

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
      intl,
      isPrefOpen,
      theme,
      timezone,
    } = this.props
    if (!isPrefOpen) {
      return null
    }

    return (
      <Dialog
        icon='person'
        onClose={handlePrefDialogClose}
        title={intl.formatMessage({ id: 'preferences.title' })}
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
              {intl.formatMessage({ id: 'preferences.language' })}
            </div>
            <div className={dialogSmallDescStyle}>
              {intl.formatMessage({ id: 'preferences.language' })}
            </div>
            <div className={dialogFieldStyle}>
              <LangMenu />
            </div>
          </div>
          <div className='row'>
            <div className={dialogDescStyle}>
              {intl.formatMessage({ id: 'preferences.theme' })}
            </div>
            <div className={dialogSmallDescStyle}>
              {intl.formatMessage({ id: 'preferences.theme' })}
            </div>
            <div className={dialogFieldStyle}>
              <ButtonGroup>
                <Button
                  name='light'
                  text={intl.formatMessage({ id: 'theme.light' })}
                  onClick={this.switchLight}
                  intent={theme.includes('light') ? Intent.PRIMARY : undefined}
                />
                <Button
                  name='dark'
                  text={intl.formatMessage({ id: 'theme.dark' })}
                  onClick={this.switchDark}
                  intent={theme.includes('dark') ? Intent.PRIMARY : undefined}
                />
              </ButtonGroup>
            </div>
          </div>
          <div className='row'>
            <div className={dialogDescStyle}>
              {intl.formatMessage({ id: 'preferences.timezone' })}
            </div>
            <div className={dialogSmallDescStyle}>
              {intl.formatMessage({ id: 'preferences.timezone' })}
            </div>
            <div className={dialogFieldStyle}>
              <TimezonePicker
                showLocalTimezone
                value={timezone}
                onChange={this.handleTimezoneChange}
              />
            </div>
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={handlePrefDialogClose}>
              {intl.formatMessage({ id: 'preferences.close' })}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default injectIntl(PrefDialog)
