import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button, Checkbox,
  Classes,
  Dialog,
  Intent,
} from '@blueprintjs/core'
import Icon from 'icons'
import PlatformLogo from 'ui/PlatformLogo'
import Select from 'ui/Select'

import { propTypes, defaultProps } from './SignIn.props'
import InputKey from '../InputKey'

const { REACT_APP_ELECTRON } = process.env

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

  onSignIn = () => {
    const { signIn } = this.props
    const { email, password } = this.state
    signIn({
      email,
      isNotProtected: !password,
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

  onEmailChange = (email) => {
    this.setState({ email })
  }

  render() {
    const {
      authData: { isPersisted },
      isElectronBackendLoaded,
      loading,
      switchMode,
      t,
      users,
    } = this.props
    const { email, password } = this.state

    const { isNotProtected } = users.find(user => user.email === email) || {}
    const isSignInDisabled = !email || (REACT_APP_ELECTRON && !isElectronBackendLoaded)
      || (!isNotProtected && !password)

    return (
      <Dialog
        className='bitfinex-auth'
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
            items={users.map(user => user.email)}
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
          <Checkbox
            className='bitfinex-auth-remember-me bitfinex-auth-remember-me--sign-in'
            name='isPersisted'
            checked={isPersisted}
            onChange={this.togglePersistence}
          >
            {t('auth.rememberMe')}
          </Checkbox>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <div className='bitfinex-auth-mode-switch' onClick={switchMode}>
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
      </Dialog>
    )
  }
}

export default withTranslation('translations')(SignIn)
