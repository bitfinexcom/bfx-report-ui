import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _split from 'lodash/split'
import _filter from 'lodash/filter'
import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _isString from 'lodash/isString'
import _includes from 'lodash/includes'
import { Classes, Dialog } from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import PlatformLogo from 'ui/PlatformLogo'
import SubAccount from 'components/SubAccounts/SubAccount'

import InputKey from '../InputKey'
import { AUTH_TYPES, MODES } from '../Auth'
import SelectedUserItem from '../SignIn/SignIn.item'

const formatAccountName = (email = '') => {
  if (!_isString(email)) return ''
  return _includes(email, '@') ? `${_split(email, '@')[0]}` : email
}

const filterRestrictedUsers = (users) => _filter(
  users, user => !user?.isRestrictedToBeAddedToSubAccount
  && _isEmpty(user?.subUsers),
)

const isUserHasSubAccounts = (users, masterAccount) => _filter(
  users, user => _isEqual(user?.email, masterAccount)
  && !_isEmpty(user?.subUsers),
).length > 0

const isMasterAccountProtected = (users, masterAccount) => _filter(
  users, user => _isEqual(user?.email, masterAccount) && !user.isNotProtected,
).length > 0

const { showFrameworkMode } = config

class RegisterSubAccounts extends PureComponent {
  static propTypes = {
    masterAccount: PropTypes.string.isRequired,
    localUsername: PropTypes.string,
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

  static defaultProps = {
    localUsername: null,
  }

  constructor(props) {
    super()

    const { masterAccount, localUsername } = props
    this.state = {
      masterAccEmail: masterAccount,
      localUsername: localUsername || formatAccountName(masterAccount),
      password: undefined,
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

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const {
      t,
      users,
      authData,
      masterAccount,
      isMultipleAccsSelected,
    } = this.props
    const { masterAccEmail, localUsername, password } = this.state
    const preparedUsers = filterRestrictedUsers(users)
    const userHasSubAccounts = isUserHasSubAccounts(users, masterAccount)
    const showInputPassword = isMasterAccountProtected(users, masterAccount)
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
        title={t(userHasSubAccounts
          ? 'auth.manageAccounts'
          : 'auth.addAccounts')}
        isCloseButtonShown={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <PlatformLogo />
          <SelectedUserItem
            user={masterAccount}
            title={userHasSubAccounts
              ? 'auth.primaryAccount'
              : 'auth.addAccountsTo'
            }
            backToUsersList={this.handleBackToSignIn}
          />
          {showInputPassword && (
            <InputKey
              name='password'
              value={password}
              label='auth.enterPassword'
              onChange={this.handleInputChange}
            />
          )}
          <InputKey
            type='text'
            name='localUsername'
            value={localUsername}
            label='subaccounts.name_label'
            onChange={this.handleInputChange}
            placeholder={t('subaccounts.name_placeholder')}
          />
          <>
            <SubAccount
              users={users}
              authData={authData}
              userPassword={password}
              allowedUsers={preparedUsers}
              localUsername={localUsername}
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
