import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Intent } from '@blueprintjs/core'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _differenceBy from 'lodash/differenceBy'

import Loading from 'ui/Loading'

import SubUsersAdd from './SubUsersAdd'
import SubUsersList from './SubUsersList'
import RemoveSubAccount from './SubAccountRemove'
import { getFilledAccounts, EMPTY_ACCOUNT } from './utils'

class SubAccount extends PureComponent {
  static propTypes = {
    authData: PropTypes.shape({
      email: PropTypes.string,
      isSubAccount: PropTypes.bool,
    }).isRequired,
    addSubAccount: PropTypes.func.isRequired,
    isSyncing: PropTypes.bool,
    isSubAccountsLoading: PropTypes.bool,
    isMultipleAccsSelected: PropTypes.bool,
    masterAccount: PropTypes.string,
    localUsername: PropTypes.string,
    updateSubAccount: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      isSubAccount: PropTypes.bool.isRequired,
      isNotProtected: PropTypes.bool.isRequired,
    })).isRequired,
    allowedUsers: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
    })),
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    allowedUsers: [],
    isSyncing: false,
    localUsername: null,
    masterAccount: undefined,
    isSubAccountsLoading: false,
    isMultipleAccsSelected: false,
  }

  state = {
    accounts: [EMPTY_ACCOUNT],
    subUsersToRemove: [],
  }

  createSubAccount = () => {
    const { addSubAccount, masterAccount, localUsername } = this.props
    const { accounts } = this.state

    const preparedAccountData = getFilledAccounts(accounts).map((account) => {
      const {
        email,
        apiKey,
        password,
        apiSecret,
      } = account

      return email
        ? { email, password: password || undefined }
        : { apiKey, apiSecret }
    })

    addSubAccount({ preparedAccountData, masterAccount, localUsername })

    this.setState({
      accounts: [EMPTY_ACCOUNT],
    })
  }

  onSubUsersChange = (accounts) => {
    this.setState({ accounts })
  }

  onSubUserToggle = (subUserEmail) => {
    const { subUsersToRemove } = this.state
    this.setState({
      subUsersToRemove: subUsersToRemove.includes(subUserEmail)
        ? subUsersToRemove.filter(email => email !== subUserEmail)
        : [...subUsersToRemove, subUserEmail],
    })
  }

  updateSubAccount = () => {
    const { masterAccount, updateSubAccount } = this.props
    const { accounts, subUsersToRemove } = this.state

    const filledAccounts = getFilledAccounts(accounts)
    if (filledAccounts.length || subUsersToRemove.length) {
      updateSubAccount({
        masterAccount,
        addedSubUsers: filledAccounts,
        removedSubUsers: subUsersToRemove,
      })

      this.setState({
        accounts: [EMPTY_ACCOUNT],
        subUsersToRemove: [],
      })
    }
  }

  render() {
    const {
      t,
      users,
      authData,
      isSyncing,
      allowedUsers,
      masterAccount,
      isSubAccountsLoading,
      isMultipleAccsSelected,
    } = this.props
    const { accounts, subUsersToRemove } = this.state
    const { email: currentUserEmail, isSubAccount } = authData
    const masterAccountEmail = masterAccount || currentUserEmail
    const subAccountData = users.find((user) => user.email === masterAccountEmail && user.isSubAccount)
    const subUsers = _get(subAccountData, 'subUsers', [])
    const hasFilledAccounts = getFilledAccounts(accounts).length > 0
    const hasSubAccount = !!users.find(user => user.email === masterAccountEmail && user.isSubAccount)
    const preparedUsers = _differenceBy(allowedUsers, subUsers, 'email')
    const isConfirmDisabled = _isEmpty(masterAccountEmail) || (!hasFilledAccounts && _isEmpty(subUsersToRemove))
    const showRemoveSubAccountBtn = (masterAccount || isSubAccount) && !isSyncing

    let showContent
    if (isSubAccountsLoading) {
      showContent = <Loading />
    } else {
      showContent = (
        <>
          {!_isEmpty(subUsers) && (
            <SubUsersList
              subUsers={subUsers}
              email={masterAccountEmail}
              onToggle={this.onSubUserToggle}
              subUsersToRemove={subUsersToRemove}
              isRemovalEnabled={masterAccount || isSubAccount}
            />
          )}
          {(masterAccount || (isSubAccount || !hasSubAccount)) && (
            <>
              <SubUsersAdd
                accounts={accounts}
                authData={authData}
                users={preparedUsers}
                addMultipleAccsEnabled
                masterAccount={masterAccount}
                onChange={this.onSubUsersChange}
                shouldFilterCurrentUser={!isMultipleAccsSelected}
              />
              <div className='sub-account-confirm'>
                <Button
                  intent={Intent.SUCCESS}
                  disabled={isConfirmDisabled}
                  className='sub-account-confirm-btn'
                  onClick={_isEmpty(subUsers) ? this.createSubAccount : this.updateSubAccount}
                >
                  {_isEmpty(subUsers)
                    ? t('subaccounts.add_accounts')
                    : t('subaccounts.update_accounts')}
                </Button>

              </div>
            </>
          )}
        </>
      )
    }

    return (
      <div className='sub-account'>
        {showRemoveSubAccountBtn && (
          <div className='sub-account-controls'>
            <RemoveSubAccount
              subUsers={subUsers}
              masterAccount={masterAccount}
            />
          </div>
        )}
        {showContent}
      </div>
    )
  }
}

export default SubAccount
