import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Button,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import _map from 'lodash/map'
import _find from 'lodash/find'
import _isEqual from 'lodash/isEqual'
import _includes from 'lodash/includes'

import Icon from 'icons'
import config from 'config'
import { tracker } from 'utils/trackers'
import PlatformLogo from 'ui/PlatformLogo'

import { MODES } from '../Auth'
import LoginOtp from '../LoginOtp'
import LoginEmail from '../LoginEmail'
import LoginApiKey from '../LoginApiKey'
import ModeSwitcher from '../ModeSwitcher'
import LoginPassword from '../LoginPassword'

const { showFrameworkMode, hostedFrameworkMode } = config
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z*.!@#$%^&(){}:;<>,?/\\~_+=|\d-]{8,}$/

// handles framework sign up and online version login
class SignUp extends PureComponent {
  static propTypes = {
    authData: PropTypes.shape({
      apiKey: PropTypes.string,
      apiSecret: PropTypes.string,
      isPersisted: PropTypes.bool.isRequired,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    signUpOtp: PropTypes.func.isRequired,
    signUpEmail: PropTypes.func.isRequired,
    showOtpLogin: PropTypes.func.isRequired,
    isOtpLoginShown: PropTypes.bool.isRequired,
    switchMode: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired,
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
      useApiKey: !showFrameworkMode,
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
    tracker.trackEvent('Add Account')
    const isValid = this.validateForm()
    const isRegisteredUserName = this.validateUsername(userName)
    if (isValid) {
      if (useApiKey) {
        signUp({
          apiKey,
          apiSecret,
          password,
          isNotProtected: !isPasswordProtected,
          isPersisted,
        })
      } else if (isRegisteredUserName) {
        this.handleExistingUser(userName)
      } else {
        signUpEmail({
          login: userName,
          password: userPassword,
        })
      }
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

  validateUsername = (userName) => {
    const { users } = this.props
    const isRegisteredUserName = _includes(
      _map(users, user => user.email), userName,
    )
    return isRegisteredUserName
  }

  handleExistingUser = (userName) => {
    const {
      users, switchMode, updateStatus, signIn,
    } = this.props
    const registeredUser = _find(users, user => _isEqual(user.email, userName))
    const { email, isSubAccount, isNotProtected } = registeredUser
    if (isNotProtected) {
      updateStatus({ id: 'auth.accAddedWithApiKeyLogin' })
      signIn({ email, isSubAccount })
    } else {
      switchMode(MODES.SIGN_IN)
      updateStatus({ id: 'auth.accAddedWithApiKey' })
    }
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
    tracker.trackEvent('Remove Password on Login')
    this.setState({
      [name]: checked,
    })
  }

  handle2FACancel = () => {
    const { showOtpLogin } = this.props
    tracker.trackEvent('Cancel')
    this.setState({ otp: '' })
    showOtpLogin(false)
  }

  handleOneTimePassword = () => {
    const { signUpOtp } = this.props
    const { otp, password, isPasswordProtected } = this.state
    tracker.trackEvent('Authenticate')
    signUpOtp({
      otp,
      password,
      isNotProtected: !isPasswordProtected,
    })
  }

  toggleUseApiKey =() => {
    tracker.trackEvent('Add account with API key')
    this.setState((state) => ({ useApiKey: !state.useApiKey }))
  }

  render() {
    const {
      t,
      users,
      loading,
      switchMode,
      isOtpLoginShown,
    } = this.props
    const {
      otp,
      apiKey,
      userName,
      password,
      useApiKey,
      apiSecret,
      userPassword,
      passwordError,
      passwordRepeat,
      passwordRepeatError,
      isPasswordProtected,
    } = this.state

    const frameworkTitle = isOtpLoginShown ? t('auth.2FA.title') : t('auth.addAccount')
    const title = showFrameworkMode ? frameworkTitle : t('auth.title')
    const showPasswordProtection = showFrameworkMode && !hostedFrameworkMode
    const isSignUpDisabled = (useApiKey && (!apiKey || !apiSecret))
      || (!useApiKey && (!userName || !userPassword))
      || (showFrameworkMode && isPasswordProtected
        && (!password || !passwordRepeat || passwordError || passwordRepeatError))
    const classes = classNames('bitfinex-auth', 'bitfinex-auth-sign-up', {
      'bitfinex-auth-sign-up--framework': showFrameworkMode,
    })
    const showLoginEmail = showFrameworkMode && !useApiKey
    const showLoginPassword = showFrameworkMode && isPasswordProtected

    return (
      <Dialog
        isOpen
        usePortal
        title={title}
        className={classes}
        isCloseButtonShown={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <PlatformLogo />
          {isOtpLoginShown
            ? (
              <LoginOtp
                otp={otp}
                handle2FACancel={this.handle2FACancel}
                handleInputChange={this.handleInputChange}
                handleOneTimePassword={this.handleOneTimePassword}
              />
            ) : (
              <>
                {showLoginEmail && (
                  <LoginEmail
                    userName={userName}
                    onSignUp={this.onSignUp}
                    userPassword={userPassword}
                    onChange={this.handleInputChange}
                  />
                )}
                {useApiKey && (
                  <LoginApiKey
                    showNote
                    apiKey={apiKey}
                    apiSecret={apiSecret}
                    onChange={this.handleInputChange}
                  />
                )}
                {showLoginPassword && (
                  <LoginPassword
                    password={password}
                    passwordError={passwordError}
                    passwordRepeat={passwordRepeat}
                    onChange={this.handleInputChange}
                    passwordLabel={'auth.enterPassword'}
                    passwordRepeatError={passwordRepeatError}
                    passwordRepeatLabel={'auth.repeatPassword'}
                  />
                )}
                <div className='bitfinex-auth-checkboxes'>
                  <div className='bitfinex-auth-checkboxes--group' />
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
              {showFrameworkMode && (
                <div
                  onClick={() => this.toggleUseApiKey()}
                  className='bitfinex-auth-mode-switch api-key-switch'
                >
                  {useApiKey ? t('auth.accWithoutApiKey') : t('auth.accWithApiKey')}
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
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              {showFrameworkMode && users.length > 0 && (
                <ModeSwitcher
                  mode={MODES.SIGN_IN}
                  icon={<Icon.SIGN_IN />}
                  switchMode={switchMode}
                  title={t('auth.signInToExistingAcc')}
                />
              )}
            </div>
          </div>
        )}
      </Dialog>
    )
  }
}

export default SignUp
