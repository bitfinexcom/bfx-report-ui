import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'
import { Classes, Dialog } from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import Select from 'ui/Select'
import PlatformLogo from 'ui/PlatformLogo'
import SubAccount from 'components/SubAccounts/SubAccount'

import { MODES } from '../Auth'
import AuthTypeSelector from '../AuthTypeSelector'

const filterRestrictedUsers = (users) => _filter(
  users, ['isRestrictedToBeAddedToSubAccount', false],
)

const prepareMasterAccUsers = (users) => _map(
  _filter(users, ['isSubAccount', false]),
  user => user.email,
)

class RegisterSubAccounts extends PureComponent {
  static propTypes = {
    authType: PropTypes.string.isRequired,
    authData: PropTypes.shape({
      apiKey: PropTypes.string,
      email: PropTypes.string,
      apiSecret: PropTypes.string,
      isPersisted: PropTypes.bool.isRequired,
    }).isRequired,
    isMultipleAccsSelected: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    switchMode: PropTypes.func.isRequired,
    switchAuthType: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      isSubAccount: PropTypes.bool.isRequired,
      isNotProtected: PropTypes.bool.isRequired,
      isRestrictedToBeAddedToSubAccount: PropTypes.bool.isRequired,
    })).isRequired,
  }

  constructor(props) {
    super()

    const { authData: { email }, users } = props
    const { email: firstUserEmail } = filterRestrictedUsers(users)[0] || {}
    this.state = {
      masterAccEmail: email || firstUserEmail,
    }
  }

  componentDidUpdate() {
    const { users } = this.props
    if (_isEmpty(users)) {
      this.clearMasterAccEmail()
    }
  }

  onEmailChange = (email) => {
    this.setState({
      masterAccEmail: email,
    })
  }

  clearMasterAccEmail = () => {
    this.setState({
      masterAccEmail: undefined,
    })
  }

  render() {
    const {
      t,
      users,
      authType,
      authData,
      switchMode,
      switchAuthType,
      isMultipleAccsSelected,
    } = this.props
    const { masterAccEmail } = this.state
    const preparedUsers = filterRestrictedUsers(users)
    const masterAccUsers = prepareMasterAccUsers(preparedUsers)
    const classes = classNames(
      'bitfinex-auth',
      'bitfinex-auth-sign-up',
      'bitfinex-auth-sign-up--sub-accs', {
        'bitfinex-auth-sign-up--framework': config.showFrameworkMode,
      },
    )

    return (
      <Dialog
        isOpen
        usePortal={false}
        className={classes}
        icon={<Icon.SIGN_UP />}
        title={t('auth.signUp')}
        isCloseButtonShown={false}
      >
        <div className={Classes.DIALOG_BODY}>
          {config.showFrameworkMode && (
            <AuthTypeSelector
              authType={authType}
              switchAuthType={switchAuthType}
            />
          )}
          <PlatformLogo />
          <h3 className='master-acc-selector--title'>
            {t('auth.selectMasterAccount')}
          </h3>
          <Select
            loading
            items={masterAccUsers}
            value={masterAccEmail}
            onChange={this.onEmailChange}
            className='bitfinex-auth-email'
            popoverClassName='bitfinex-auth-email-popover'
          />
          <>
            <SubAccount
              authData={authData}
              users={preparedUsers}
              masterAccount={masterAccEmail}
              isMultipleAccsSelected={isMultipleAccsSelected}
            />
          </>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {config.showFrameworkMode && users.length > 0 && (
              <div
                className='bitfinex-auth-mode-switch'
                onClick={() => switchMode(MODES.SIGN_IN)}
              >
                {t('auth.signIn')}
              </div>
            )}
          </div>
        </div>
      </Dialog>
    )
  }
}

export default RegisterSubAccounts
