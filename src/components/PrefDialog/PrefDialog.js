import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import {
  Button,
  Classes,
  Dialog,
  ButtonGroup,
  Intent,
} from '@blueprintjs/core'
import { TimezonePicker } from '@blueprintjs/timezone'

import LangMenu from 'components/LangMenu'

import { propTypes, defaultProps } from './PrefDialog.props'

const descClasses = classNames(
  'bitfinex-preferences-desc',
  'bitfinex-text-align-right',
  'hidden-xs',
  'col-sm-3',
  'col-md-3',
  'col-lg-3',
  'col-xl-3',
)

const xsClasses = classNames(
  'col-xs-12',
  'hidden-sm',
  'hidden-md',
  'hidden-lg',
  'hidden-xl',
)

const fieldClasses = classNames(
  'col-xs-12',
  'col-sm-9',
  'col-md-9',
  'col-lg-9',
  'col-xl-9',
)

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
            <div className={descClasses}>
              {intl.formatMessage({ id: 'preferences.language' })}
            </div>
            <div className={xsClasses}>
              {intl.formatMessage({ id: 'preferences.language' })}
            </div>
            <div className={fieldClasses}>
              <LangMenu />
            </div>
          </div>
          <div className='row'>
            <div className={descClasses}>
              {intl.formatMessage({ id: 'preferences.theme' })}
            </div>
            <div className={xsClasses}>
              {intl.formatMessage({ id: 'preferences.theme' })}
            </div>
            <div className={fieldClasses}>
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
            <div className={descClasses}>
              {intl.formatMessage({ id: 'preferences.timezone' })}
            </div>
            <div className={xsClasses}>
              {intl.formatMessage({ id: 'preferences.timezone' })}
            </div>
            <div className={fieldClasses}>
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
