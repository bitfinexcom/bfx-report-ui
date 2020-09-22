import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'
import _get from 'lodash/get'

import SubUsersList from './SubUsersList'
import { propTypes, defaultProps } from './SubAccount.props'
import RemoveSubAccount from './SubAccountRemove'
import SubAccountLogin from './SubAccountLogin'
import SubUsersAdd from './SubUsersAdd'
import { getFilledAccounts, EMPTY_ACCOUNT } from './utils'

class SubAccount extends PureComponent {
  state = {
    accounts: [EMPTY_ACCOUNT],
    subUsersToRemove: [],
  }

  createSubAccount = () => {
    const { addSubAccount } = this.props
    const { accounts } = this.state

    const preparedAccountData = getFilledAccounts(accounts).map((account) => {
      const {
        email,
        password,
        apiKey,
        apiSecret,
      } = account

      return email
        ? { email, password: password || undefined }
        : { apiKey, apiSecret }
    })

    addSubAccount(preparedAccountData)

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
    const { updateSubAccount } = this.props
    const { accounts, subUsersToRemove } = this.state

    const hasFilledAccounts = getFilledAccounts(accounts).length > 0
    if (hasFilledAccounts || subUsersToRemove.length) {
      updateSubAccount({
        addedSubUsers: accounts,
        removedSubUsers: subUsersToRemove,
      })

      this.setState({
        accounts: [EMPTY_ACCOUNT],
        subUsersToRemove: [],
      })
    }
  }

  render() {
    const { authData, users, t } = this.props
    const { accounts, subUsersToRemove } = this.state
    const { email: currentUserEmail, isSubAccount } = authData

    const subAccountData = users.find((user) => user.email === currentUserEmail && user.isSubAccount)
    const subUsers = _get(subAccountData, 'subUsers', [])

    const hasFilledAccounts = getFilledAccounts(accounts).length > 0
    const hasSubAccount = !!users.find(user => user.email === currentUserEmail && user.isSubAccount)

    return (
      <div className='sub-account'>
        {hasSubAccount && (
          <>
            <div className='sub-accounts-controls'>
              <RemoveSubAccount authData={authData} />
              {!isSubAccount && <SubAccountLogin authData={authData} />}
            </div>
            {subUsers.length > 0 && (
              <SubUsersList
                onToggle={this.onSubUserToggle}
                subUsers={subUsers}
                subUsersToRemove={subUsersToRemove}
              />
            )}
          </>
        )}
        {!hasSubAccount && <div className='subtitle'>{t('subaccounts.create')}</div>}
        <SubUsersAdd
          accounts={accounts}
          authData={authData}
          onChange={this.onSubUsersChange}
          users={users}
        />

        <Button
          className='sub-account-confirm'
          disabled={!hasFilledAccounts}
          intent={Intent.PRIMARY}
          onClick={subUsers.length > 0 ? this.updateSubAccount : this.createSubAccount}
        >
          {subUsers.length > 0 ? t('update') : t('timeframe.custom.confirm')}
        </Button>
      </div>
    )
  }
}

SubAccount.propTypes = propTypes
SubAccount.defaultProps = defaultProps

export default withTranslation('translations')(SubAccount)
