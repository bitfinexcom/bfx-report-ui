import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import config from 'config'

import SignUp from './SignUp'
import SignIn from './SignIn'
import PasswordRecovery from './PasswordRecovery'
import { propTypes, defaultProps } from './Auth.props'

export const MODES = {
  SIGN_UP: 'sign_up',
  SIGN_IN: 'sign_in',
  PASSWORD_RECOVERY: 'password_recovery',
}

class Auth extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super()

    const { authData: { hasAuthData } } = props

    this.state = {
      mode: (!config.showFrameworkMode || !hasAuthData) ? MODES.SIGN_UP : MODES.SIGN_IN,
    }
  }

  componentDidUpdate(prevProps) {
    const { isUsersLoaded, users } = this.props
    if (config.showFrameworkMode && !prevProps.isUsersLoaded && isUsersLoaded && users.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ mode: MODES.SIGN_IN })
    }
  }

  switchMode = (mode) => {
    this.setState({ mode })
  }

  render() {
    const {
      authData: { hasAuthData },
      isShown,
      t,
      usersLoading,
    } = this.props
    const { mode } = this.state

    if (!isShown || (config.showFrameworkMode && !hasAuthData && usersLoading)) {
      return null
    }

    if (!config.showAuthPage) {
      return (
        <NonIdealState
          className='bitfinex-nonideal'
          icon={IconNames.KEY}
          title={t('auth.nonideal.title')}
          description={t('auth.nonideal.description')}
        />
      )
    }

    switch (mode) {
      case MODES.SIGN_UP:
      default:
        return <SignUp switchMode={this.switchMode} />
      case MODES.SIGN_IN:
        return <SignIn switchMode={this.switchMode} />
      case MODES.PASSWORD_RECOVERY:
        return <PasswordRecovery switchMode={this.switchMode} />
    }
  }
}

export default withTranslation('translations')(Auth)
