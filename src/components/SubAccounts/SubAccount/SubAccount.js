import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'
import _get from 'lodash/get'

import Loading from 'ui/Loading'
import SubUsersList from './SubUsersList'
import { propTypes, defaultProps } from './SubAccount.props'
import RemoveSubAccount from './SubAccountRemove'
import SubUsersAdd from './SubUsersAdd'
import { getFilledAccounts, EMPTY_ACCOUNT } from './utils'

class SubAccount extends PureComponent {
  state = {
    accounts: [EMPTY_ACCOUNT],
    subUsersToRemove: [],
  }

  createSubAccount = () => {
    const { addSubAccount, masterAccount } = this.props
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

    addSubAccount({ preparedAccountData, masterAccount })

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
      masterAccount,
      isSubAccountsLoading,
      addMultipleAccsEnabled,
    } = this.props
    const { accounts, subUsersToRemove } = this.state
    const { email: currentUserEmail, isSubAccount } = authData
    const masterAccountEmail = masterAccount || currentUserEmail
    const subAccountData = users.find((user) => user.email === masterAccountEmail && user.isSubAccount)
    const subUsers = _get(subAccountData, 'subUsers', [])
    const hasFilledAccounts = getFilledAccounts(accounts).length > 0
    const hasSubAccount = !!users.find(user => user.email === masterAccountEmail && user.isSubAccount)
    let showContent
    if (isSubAccountsLoading) {
      showContent = <Loading />
    } else {
      showContent = (
        <>
          {subUsers.length > 0 && (
          <SubUsersList
            subUsers={subUsers}
            email={masterAccountEmail}
            onToggle={this.onSubUserToggle}
            subUsersToRemove={subUsersToRemove}
            isRemovalEnabled={masterAccount || isSubAccount}
          />
          )}
          {(masterAccount || (!isSubAccount && !hasSubAccount)) && (
          <div className='subtitle'>{t('subaccounts.create')}</div>
          )}
          {(masterAccount || (isSubAccount || !hasSubAccount)) && (
            <>
              <SubUsersAdd
                users={users}
                accounts={accounts}
                authData={authData}
                onChange={this.onSubUsersChange}
                masterAccount={masterAccount}
                addMultipleAccsEnabled={addMultipleAccsEnabled}
              />
              <Button
                className='sub-account-confirm'
                intent={Intent.PRIMARY}
                disabled={!hasFilledAccounts && !subUsersToRemove.length}
                onClick={subUsers.length > 0 ? this.updateSubAccount : this.createSubAccount}
              >
                {subUsers.length > 0 ? t('update') : t('timeframe.custom.confirm')}
              </Button>
            </>
          )}
        </>
      )
    }

    return (
      <div className='sub-account'>
        {(masterAccount || isSubAccount) && (
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

SubAccount.propTypes = propTypes
SubAccount.defaultProps = defaultProps

export default withTranslation('translations')(SubAccount)
