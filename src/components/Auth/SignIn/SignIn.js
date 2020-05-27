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

import { propTypes, defaultProps } from './SignIn.props'
import InputKey from '../InputKey'

class SignIn extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super()

    const { authData: { email, password } } = props
    this.state = {
      email,
      password,
    }
  }

  onSignIn = () => {
    const { signIn } = this.props
    const { email, password } = this.state
    signIn({
      email,
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
    const { email, password } = this.state

    const isSignInDisabled = !email || !password

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
          <InputKey
            label='auth.enterEmail'
            name='email'
            value={email}
            onChange={this.handleInputChange}
          />
          <InputKey
            label='auth.enterPassword'
            name='password'
            value={password}
            onChange={this.handleInputChange}
          />
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
