import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'
import {
  Button,
  Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'

import config from 'config'
import Icon from 'icons'
import PlatformLogo from 'ui/PlatformLogo'
import Select from 'ui/Select'

import InputKey from '../InputKey'
import { MODES } from '../Auth'
import AuthTypeSelector from '../AuthTypeSelector'

const getPreparedUsers = (users, multi = false) => (multi
  ? _filter(users, 'isSubAccount').map(user => user.email)
  : _filter(users, ['isSubAccount', false]).map(user => user.email))


class SignIn extends PureComponent {
  static propTypes = {
    authType: PropTypes.string.isRequired,
    authData: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      isPersisted: PropTypes.bool,
      isSubAccount: PropTypes.bool,
    }).isRequired,
    isMultipleAccsSelected: PropTypes.bool.isRequired,
    isElectronBackendLoaded: PropTypes.bool.isRequired,
    isUsersLoaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
    switchMode: PropTypes.func.isRequired,
    switchAuthType: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    updateAuth: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      isSubAccount: PropTypes.bool.isRequired,
      isNotProtected: PropTypes.bool.isRequired,
    })).isRequired,
  }

  constructor(props) {
    super()

    const { authData: { email, password }, users, isMultipleAccsSelected } = props
    const { email: firstUserEmail } = users[0] || {}
    const multiAccsUsers = getPreparedUsers(users, isMultipleAccsSelected)
    const multiAccsEmail = multiAccsUsers[0]
    const initialEmail = isMultipleAccsSelected
      ? multiAccsEmail || ''
      : email || firstUserEmail
    this.state = {
      email: initialEmail,
      password,
    }
  }

  componentDidUpdate(prevProps) {
    const {
      authData: { email },
      users,
      isUsersLoaded,
      switchMode,
      isMultipleAccsSelected,
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

    if (!prevProps.isMultipleAccsSelected && isMultipleAccsSelected) {
      const multiAccsUsers = getPreparedUsers(users, isMultipleAccsSelected)
      const updatedEmail = multiAccsUsers[0]
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        email: updatedEmail || '',
      })
    }

    this.handleSubAccounts()
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

  handleSubAccounts = () => {
    const {
      authData: { isSubAccount },
      updateAuth,
      isMultipleAccsSelected,
    } = this.props
    if (isMultipleAccsSelected && !isSubAccount)updateAuth({ isSubAccount: true })
    if (!isMultipleAccsSelected && isSubAccount)updateAuth({ isSubAccount: false })
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
      authType,
      isElectronBackendLoaded,
      isMultipleAccsSelected,
      loading,
      switchAuthType,
      switchMode,
      t,
      users,
    } = this.props
    const { email, password } = this.state

    const { isNotProtected } = users.find(user => user.email === email && user.isSubAccount === isSubAccount) || {}
    const isSignInDisabled = !email || (config.isElectronApp && !isElectronBackendLoaded)
      || (!isNotProtected && !password)
    const isCurrentUserHasSubAccount = !!users.find(user => user.email === email && user.isSubAccount)
    const showSubAccount = isCurrentUserHasSubAccount && isMultipleAccsSelected
    const preparedUsers = getPreparedUsers(users, isMultipleAccsSelected)
    const isEmailSelected = !_isEmpty(email)


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
          {config.showFrameworkMode && (
            <AuthTypeSelector
              authType={authType}
              switchAuthType={switchAuthType}
            />
          )}
          <PlatformLogo />
          <Select
            className='bitfinex-auth-email'
            items={preparedUsers}
            onChange={this.onEmailChange}
            popoverClassName='bitfinex-auth-email-popover'
            value={email}
            loading
          />
          {!isNotProtected && isEmailSelected && users.length > 0 && (
            <InputKey
              label='auth.enterPassword'
              name='password'
              value={password}
              onChange={this.handleInputChange}
            />
          )}
          <div className='bitfinex-auth-checkboxes'>
            {isEmailSelected && (
              <Checkbox
                className='bitfinex-auth-remember-me bitfinex-auth-remember-me--sign-in'
                name='isPersisted'
                checked={isPersisted}
                onChange={this.togglePersistence}
              >
                {t('auth.rememberMe')}
              </Checkbox>
            )}
            {showSubAccount && (
              <Checkbox
                className='bitfinex-auth-remember-me bitfinex-auth-remember-me--sign-in'
                name='isSubAccount'
                checked={isSubAccount}
                // onChange={this.toggleSubAccount}
                // disabled
              >
                {t('auth.subAccount')}
              </Checkbox>
            )}
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <div
              className='bitfinex-auth-password-recovery'
              onClick={() => switchMode(MODES.PASSWORD_RECOVERY)}
            >
              {t('auth.passwordRecovery')}
            </div>
            <div>
              <div
                className='bitfinex-auth-mode-switch'
                onClick={() => switchMode(MODES.SIGN_UP)}
              >
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

export default SignIn
