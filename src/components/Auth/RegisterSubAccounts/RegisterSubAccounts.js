import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'
import { Classes, Dialog } from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import PlatformLogo from 'ui/PlatformLogo'
import SubAccount from 'components/SubAccounts/SubAccount'

import { AUTH_TYPES, MODES } from '../Auth'
import SelectedUserItem from '../SignIn/SignIn.item'

const filterRestrictedUsers = (users) => _filter(
  users, user => !user?.isRestrictedToBeAddedToSubAccount
  && _isEmpty(user?.subUsers),
)

const { showFrameworkMode } = config

class RegisterSubAccounts extends PureComponent {
  static propTypes = {
    masterAccount: PropTypes.string.isRequired,
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

    const { masterAccount } = props
    this.state = {
      masterAccEmail: masterAccount,
    }
  }

  componentDidUpdate() {
    const { users } = this.props
    if (_isEmpty(users)) {
      this.clearMasterAccEmail()
    }
  }

  clearMasterAccEmail = () => {
    this.setState({
      masterAccEmail: undefined,
    })
  }

  handleBackToSignIn = () => {
    const { switchMode, switchAuthType } = this.props
    switchMode(MODES.SIGN_IN)
    switchAuthType(AUTH_TYPES.SIMPLE_ACCOUNTS)
    this.clearMasterAccEmail()
  }

  render() {
    const {
      t,
      users,
      authData,
      masterAccount,
      isMultipleAccsSelected,
    } = this.props
    const { masterAccEmail } = this.state
    const preparedUsers = filterRestrictedUsers(users)
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
          <PlatformLogo />
          <SelectedUserItem
            user={masterAccount}
            title={'auth.addAccountsTo'}
            backToUsersList={this.handleBackToSignIn}
          />
          <>
            <SubAccount
              authData={authData}
              users={users}
              allowedUsers={preparedUsers}
              masterAccount={masterAccEmail}
              isMultipleAccsSelected={isMultipleAccsSelected}
            />
          </>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {showFrameworkMode && users.length > 0 && (
              <div className='auth-mode-switch-wrapper'>
                <div
                  className='bitfinex-auth-mode-switch'
                  onClick={() => this.handleBackToSignIn()}
                >
                  <Icon.SIGN_IN />
                  {t('auth.signInToExistingAcc')}
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    )
  }
}

export default RegisterSubAccounts
