import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import { platform } from 'var/config'

import SignUp from './SignUp'
import SignIn from './SignIn'
import { propTypes, defaultProps } from './Auth.props'

const MODES = {
  SIGH_UP: 'sign_up',
  SIGH_IN: 'sign_in',
}

class Auth extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super()

    const { authData: { isNotFirstAuth } } = props

    this.state = {
      mode: (!platform.showFrameworkMode || !isNotFirstAuth) ? MODES.SIGH_UP : MODES.SIGN_IN,
    }
  }

  switchMode = () => {
    this.setState(({ mode }) => ({
      mode: mode === MODES.SIGH_UP ? MODES.SIGH_IN : MODES.SIGH_UP,
    }))
  }

  render() {
    const { isShown, t } = this.props
    const { mode } = this.state

    if (!isShown) {
      return null
    }

    if (!platform.showAuthPage) {
      return (
        <NonIdealState
          className='bitfinex-nonideal'
          icon={IconNames.KEY}
          title={t('auth.nonideal.title')}
          description={t('auth.nonideal.description')}
        />
      )
    }

    if (mode === MODES.SIGH_UP) {
      return <SignUp switchMode={this.switchMode} />
    }

    return <SignIn switchMode={this.switchMode} />
  }
}

export default withTranslation('translations')(Auth)
