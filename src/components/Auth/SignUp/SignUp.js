import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Button,
  Callout,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import Icon from 'icons'
import PlatformLogo from 'ui/PlatformLogo'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './SignUp.props'
import InputKey from '../InputKey'

// handles framework sign up and online version login
class SignUp extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super()

    const { authData: { apiKey, apiSecret } } = props
    this.state = {
      apiKey,
      apiSecret,
      password: '',
      passwordRepeat: '',
    }
  }

  onSignUp = () => {
    const { signUp } = this.props
    const {
      apiKey, apiSecret, password,
    } = this.state
    signUp({
      apiKey,
      apiSecret,
      password,
    })
  }

  togglePersistence = () => {
    const { authData: { isPersisted }, updateAuth } = this.props
    updateAuth({ isPersisted: !isPersisted })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    const {
      authData: { isPersisted },
      loading,
      switchMode,
      t,
    } = this.props
    const {
      apiKey,
      apiSecret,
      password,
      passwordRepeat,
    } = this.state

    const title = platform.showFrameworkMode ? t('auth.signUp') : t('auth.title')
    const icon = platform.showFrameworkMode ? <Icon.SIGN_UP /> : <Icon.SIGN_IN />
    const isSignUpDisabled = !apiKey || !apiSecret
      || (platform.showFrameworkMode && (!password || password !== passwordRepeat))

    const classes = classNames('bitfinex-auth', 'bitfinex-auth-sign-up', {
      'bitfinex-auth-sign-up--framework': platform.showFrameworkMode,
    })

    return (
      <Dialog
        className={classes}
        title={title}
        isOpen
        icon={icon}
        isCloseButtonShown={false}
        usePortal={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <PlatformLogo />
          <Callout>
            {t('auth.note1')}
            <a href={platform.KEY_URL} target='_blank' rel='noopener noreferrer'>
              {platform.KEY_URL.split('https://')[1]}
            </a>
            {t('auth.note2')}
          </Callout>
          <div className='bitfinex-auth-inputs-group'>
            <InputKey
              label='auth.enterAPIKey'
              name='apiKey'
              value={apiKey}
              onChange={this.handleInputChange}
            />
            <InputKey
              label='auth.enterAPISecret'
              name='apiSecret'
              value={apiSecret}
              onChange={this.handleInputChange}
            />
          </div>
          {platform.showFrameworkMode && (
            <div className='bitfinex-auth-inputs-group'>
              <InputKey
                label='auth.enterPassword'
                name='password'
                value={password}
                onChange={this.handleInputChange}
              />
              <InputKey
                label='auth.repeatPassword'
                name='passwordRepeat'
                value={passwordRepeat}
                onChange={this.handleInputChange}
              />
            </div>
          )}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Checkbox
              className='bitfinex-auth-remember-me'
              name={'isPersisted'}
              checked={isPersisted}
              onChange={this.togglePersistence}
            >
              {t('auth.rememberMe')}
            </Checkbox>
            {platform.showFrameworkMode && (
              <div className='bitfinex-auth-mode-switch' onClick={switchMode}>
                {t('auth.signIn')}
              </div>
            )}
            <Button
              className='bitfinex-auth-check'
              name='check'
              intent={Intent.SUCCESS}
              onClick={this.onSignUp}
              disabled={isSignUpDisabled}
              loading={loading}
            >
              {title}
            </Button>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withTranslation('translations')(SignUp)
