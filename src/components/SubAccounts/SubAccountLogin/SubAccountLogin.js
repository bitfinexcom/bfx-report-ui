import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

import { propTypes, defaultProps } from './SubAccountLogin.props'

class SubAccountLogin extends PureComponent {
  loginToSubAccount = () => {
    const { authData, logout, signIn } = this.props
    const { email, password, isNotProtected } = authData

    logout()
    signIn({
      email,
      isNotProtected,
      isSubAccount: true,
      password,
    })
  }

  render() {
    const { t } = this.props

    return (
      <Button
        className='section-sub-accounts-remove mt20 ml20'
        intent={Intent.PRIMARY}
        onClick={this.loginToSubAccount}
      >
        {t('subaccounts.login')}
      </Button>
    )
  }
}

SubAccountLogin.propTypes = propTypes
SubAccountLogin.defaultProps = defaultProps

export default withTranslation('translations')(SubAccountLogin)
