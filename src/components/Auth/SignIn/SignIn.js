import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button, Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import config from 'config'
import Icon from 'icons'
import PlatformLogo from 'ui/PlatformLogo'
import Select from 'ui/Select'

import { propTypes, defaultProps } from './SignIn.props'
import InputKey from '../InputKey'
import { MODES } from '../Auth'

class SignIn extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super()

    const { authData: { email, password }, users } = props
    const { email: firstUserEmail } = users[0] || {}
    this.state = {
      email: email || firstUserEmail,
      password,
    }
  }

  componentDidUpdate(prevProps) {
    const {
      authData: { email },
      users,
      isUsersLoaded,
      switchMode,
    } = this.props

    if (!prevProps.isUsersLoaded && isUsersLoaded) {
      if (users.length) {
        const { email: firstUserEmail } = users[0] || {}

        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          email: email || firstUserEmail,
        })
      } else {
        switchMode(MODES.SIGN_UP)
      }
    }
  }

  onSignIn = () => {
    const { authData: { isSubAccount }, signIn, users } = this.props
    const { email, password } = this.state
    const isCurrentUserHasSubAccount = !!users.find(user => user.email === email && user.isSubAccount)
    signIn({
      email,
      isNotProtected: !password,
      isSubAccount: isCurrentUserHasSubAccount ? isSubAccount : false,
      password,
    })
  }

  togglePersistence = () => {
    const { authData: { isPersisted }, updateAuth } = this.props
    updateAuth({ isPersisted: !isPersisted })
  }

  toggleSubAccount = () => {
    const { authData: { isSubAccount }, updateAuth } = this.props
    updateAuth({ isSubAccount: !isSubAccount })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  onEmailChange = (email) => {
    const { authData: { email: preservedEmail, password } } = this.props
    this.setState({
      email,
      password: email === preservedEmail ? password : undefined,
    })
  }

  render() {
    const {
      authData: { isPersisted, isSubAccount },
      isElectronBackendLoaded,
      loading,
      switchMode,
      t,
      users,
    } = this.props
    const { email, password } = this.state

    const { isNotProtected } = users.find(user => user.email === email && user.isSubAccount === isSubAccount) || {}
    const isSignInDisabled = !email || (config.isElectronApp && !isElectronBackendLoaded)
      || (!isNotProtected && !password)
    const isCurrentUserHasSubAccount = !!users.find(user => user.email === email && user.isSubAccount)

    return (
      <Dialog
        className='bitfinex-auth bitfinex-auth-sign-in'
        title={t('auth.signIn')}
        isOpen
        icon={<Icon.SIGN_IN />}
        isCloseButtonShown={false}
        usePortal={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <PlatformLogo />
          <Select
            className='bitfinex-auth-email'
            items={users.filter((user) => !user.isSubAccount).map(user => user.email)}
            onChange={this.onEmailChange}
            popoverClassName='bitfinex-auth-email-popover'
            value={email}
            loading
          />
          {!isNotProtected && users.length > 0 && (
            <InputKey
              label='auth.enterPassword'
              name='password'
              value={password}
              onChange={this.handleInputChange}
            />
          )}
          <div className='bitfinex-auth-checkboxes'>
            <Checkbox
              className='bitfinex-auth-remember-me bitfinex-auth-remember-me--sign-in'
              name='isPersisted'
              checked={isPersisted}
              onChange={this.togglePersistence}
            >
              {t('auth.rememberMe')}
            </Checkbox>
            {isCurrentUserHasSubAccount && (
              <Checkbox
                className='bitfinex-auth-remember-me bitfinex-auth-remember-me--sign-in'
                name='isSubAccount'
                checked={isSubAccount}
                onChange={this.toggleSubAccount}
              >
                {t('auth.subAccount')}
              </Checkbox>
            )}
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <div className='bitfinex-auth-password-recovery' onClick={() => switchMode(MODES.PASSWORD_RECOVERY)}>
              {t('auth.passwordRecovery')}
            </div>
            <div>
              <div className='bitfinex-auth-mode-switch' onClick={() => switchMode(MODES.SIGN_UP)}>
                {t('auth.signUp')}
              </div>
              <Button
                className='bitfinex-auth-check'
                name='check'
                intent={Intent.SUCCESS}
                onClick={this.onSignIn}
                disabled={isSignInDisabled}
                loading={loading}
              >
                {t('auth.signIn')}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
}

export default withTranslation('translations')(SignIn)
