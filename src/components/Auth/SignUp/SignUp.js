import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Button,
  Callout,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import _isEmpty from 'lodash/isEmpty'

import Icon from 'icons'
import config from 'config'
import PlatformLogo from 'ui/PlatformLogo'

import { MODES } from '../Auth'
import InputKey from '../InputKey'
import ErrorLabel from '../ErrorLabel'
import AuthTypeSelector from '../AuthTypeSelector'

const { showFrameworkMode, hostedFrameworkMode } = config
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z*.!@#$%^&(){}:;<>,?/\\~_+=|\d-]{8,}$/

// handles framework sign up and online version login
class SignUp extends PureComponent {
  static propTypes = {
    authType: PropTypes.string.isRequired,
    authData: PropTypes.shape({
      apiKey: PropTypes.string,
      apiSecret: PropTypes.string,
      isPersisted: PropTypes.bool.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    signUpOtp: PropTypes.func.isRequired,
    signUpEmail: PropTypes.func.isRequired,
    showOtpLogin: PropTypes.func.isRequired,
    isOtpLoginShown: PropTypes.bool.isRequired,
    switchMode: PropTypes.func.isRequired,
    switchAuthType: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      isSubAccount: PropTypes.bool.isRequired,
      isNotProtected: PropTypes.bool.isRequired,
    })).isRequired,
  }

  constructor(props) {
    super()

    const { authData: { apiKey, apiSecret, isPersisted } } = props
    this.state = {
      apiKey,
      apiSecret,
      isPersisted,
      password: '',
      useApiKey: false,
      passwordError: '',
      passwordRepeat: '',
      isBeingValidated: false,
      otp: '',
      passwordRepeatError: '',
      userName: '',
      userPassword: '',
      isPasswordProtected: config.hostedFrameworkMode,
    }
  }

  onSignUp = () => {
    const { signUp, signUpEmail } = this.props
    const {
      apiKey,
      apiSecret,
      password,
      isPasswordProtected,
      isPersisted,
      useApiKey,
      userName,
      userPassword,
    } = this.state
    this.setState({
      isBeingValidated: true,
    })
    if (useApiKey) {
      const isValid = this.validateForm()
      if (isValid) {
        signUp({
          apiKey,
          apiSecret,
          password,
          isNotProtected: !isPasswordProtected,
          isPersisted,
        })
      }
    } else {
      signUpEmail({
        login: userName,
        password: userPassword,
      })
    }
  }

  validateForm = () => {
    const {
      password,
      passwordRepeat,
      isPasswordProtected,
      passwordError,
      passwordRepeatError,
    } = this.state

    if (!showFrameworkMode || !isPasswordProtected) {
      return true
    }

    let isValid = true
    const isValidPassword = passwordRegExp.test(password)

    if (password.length < 8) {
      this.setState({ passwordError: 'auth.passwordLengthValidationError' })
      isValid = false
    } else if (!isValidPassword) {
      this.setState({ passwordError: 'auth.passwordCharactersValidationError' })
      isValid = false
    } else if (passwordError) {
      this.setState({ passwordError: '' })
    }

    // don't start validating password repeat if password is invalid yet
    if (!isValid && !passwordRepeatError) {
      return isValid
    }

    if (password !== passwordRepeat) {
      this.setState({ passwordRepeatError: 'auth.passwordRepeatValidationError' })
      isValid = false
    } else if (passwordRepeatError) {
      this.setState({ passwordRepeatError: '' })
    }

    return isValid
  }

  handleInputChange = (e) => {
    const { isBeingValidated } = this.state
    const { name, value } = e.target
    this.setState({
      [name]: value,
    }, () => isBeingValidated && this.validateForm())
  }

  handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    this.setState({
      [name]: checked,
    })
  }

  handle2FACancel = () => {
    const { showOtpLogin } = this.props
    this.setState({ otp: '' })
    showOtpLogin(false)
  }

  handleOneTimePassword = () => {
    const { signUpOtp } = this.props
    const { otp } = this.state
    signUpOtp({ otp })
  }

  render() {
    const {
      t,
      users,
      loading,
      authType,
      switchMode,
      switchAuthType,
      isOtpLoginShown,
    } = this.props
    const {
      otp,
      apiKey,
      userName,
      password,
      useApiKey,
      apiSecret,
      isPersisted,
      userPassword,
      passwordError,
      passwordRepeat,
      passwordRepeatError,
      isPasswordProtected,
    } = this.state

    const frameworkTitle = isOtpLoginShown ? t('auth.2FA.title') : t('auth.signUp')
    const title = showFrameworkMode ? frameworkTitle : t('auth.signUp')
    const icon = showFrameworkMode ? <Icon.SIGN_UP /> : <Icon.SIGN_IN />
    const showPasswordProtection = showFrameworkMode && !hostedFrameworkMode
    const isSignUpDisabled = !userName || !userPassword
      || (useApiKey && (!apiKey || !apiSecret))
      || (showFrameworkMode && isPasswordProtected
        && (!password || !passwordRepeat || passwordError || passwordRepeatError))
    const classes = classNames('bitfinex-auth', 'bitfinex-auth-sign-up', {
      'bitfinex-auth-sign-up--framework': showFrameworkMode,
    })
    const showAuthTypeSelector = showFrameworkMode && useApiKey

    return (
      <Dialog
        isOpen
        usePortal
        icon={icon}
        title={title}
        className={classes}
        isCloseButtonShown={false}
      >
        <div className={Classes.DIALOG_BODY}>
          {showAuthTypeSelector && (
            <AuthTypeSelector
              authType={authType}
              switchAuthType={switchAuthType}
            />
          )}
          <PlatformLogo />
          {isOtpLoginShown
            ? (
              <>
                <InputKey
                  name='otp'
                  type='text'
                  value={otp}
                  label='auth.2FA.GAToken'
                  onChange={this.handleInputChange}
                  placeholder={t('auth.2FA.sixDigits')}
                />
                <div className='buttons-row'>
                  <Button
                    name='cancel'
                    intent={Intent.NONE}
                    onClick={this.handle2FACancel}
                    className='bitfinex-auth-check'
                  >
                    {t('auth.2FA.cancel')}
                  </Button>
                  <Button
                    name='auth'
                    intent={Intent.SUCCESS}
                    disabled={_isEmpty(otp)}
                    className='bitfinex-auth-check'
                    onClick={this.handleOneTimePassword}
                  >
                    {t('auth.2FA.auth')}
                  </Button>
                </div>
              </>
            ) : (
              <>
                {!useApiKey && (
                  <>
                    <InputKey
                      type='text'
                      name='userName'
                      value={userName}
                      onChange={this.handleInputChange}
                      label='auth.loginEmail.emailOrUserName'
                    />
                    <InputKey
                      name='userPassword'
                      value={userPassword}
                      label='auth.loginEmail.password'
                      onChange={this.handleInputChange}
                    />
                  </>
                )}
                {useApiKey && (
                  <>
                    <Callout>
                      {t('auth.note1')}
                      <a href={config.KEY_URL} target='_blank' rel='noopener noreferrer'>
                        {config.KEY_URL.split('https://')[1]}
                      </a>
                      {t('auth.note2')}
                    </Callout>
                    <InputKey
                      name='apiKey'
                      value={apiKey}
                      label='auth.enterAPIKey'
                      onChange={this.handleInputChange}
                    />
                    <InputKey
                      name='apiSecret'
                      value={apiSecret}
                      label='auth.enterAPISecret'
                      onChange={this.handleInputChange}
                    />
                  </>
                )}
                {showFrameworkMode && isPasswordProtected && (
                  <>
                    <InputKey
                      name='password'
                      value={password}
                      label='auth.enterPassword'
                      onChange={this.handleInputChange}
                    />
                    <ErrorLabel text={passwordError} />
                    <InputKey
                      name='passwordRepeat'
                      value={passwordRepeat}
                      label='auth.repeatPassword'
                      onChange={this.handleInputChange}
                    />
                    <ErrorLabel text={passwordRepeatError} />
                  </>
                )}
                <div className='bitfinex-auth-checkboxes'>
                  <div className='bitfinex-auth-checkboxes--group'>
                    <Checkbox
                      name='useApiKey'
                      checked={useApiKey}
                      onChange={this.handleCheckboxChange}
                      className='bitfinex-auth-remember-me'
                    >
                      {t('auth.useApiKey')}
                    </Checkbox>
                    <Checkbox
                      name='isPersisted'
                      checked={isPersisted}
                      onChange={this.handleCheckboxChange}
                      className='bitfinex-auth-remember-me'
                    >
                      {t('auth.rememberMe')}
                    </Checkbox>
                  </div>
                  {showPasswordProtection && (
                  <Checkbox
                    name='isPasswordProtected'
                    checked={isPasswordProtected}
                    onChange={this.handleCheckboxChange}
                    className='bitfinex-auth-remember-me'
                  >
                    {t('auth.passwordProtection')}
                  </Checkbox>
                  )}
                </div>
              </>
            )}
        </div>
        {!isOtpLoginShown && (
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              {showFrameworkMode && users.length > 0 && (
              <div className='bitfinex-auth-mode-switch' onClick={() => switchMode(MODES.SIGN_IN)}>
                {t('auth.signIn')}
              </div>
              )}
              <Button
                name='check'
                loading={loading}
                intent={Intent.SUCCESS}
                onClick={this.onSignUp}
                disabled={isSignUpDisabled}
                className='bitfinex-auth-check'
              >
                {title}
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    )
  }
}

export default SignUp
