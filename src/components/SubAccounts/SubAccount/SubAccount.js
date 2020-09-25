import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'
import _get from 'lodash/get'

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

    const filledAccounts = getFilledAccounts(accounts)
    if (filledAccounts.length || subUsersToRemove.length) {
      updateSubAccount({
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
    const { authData, users, t } = this.props
    const { accounts, subUsersToRemove } = this.state
    const { email: currentUserEmail, isSubAccount } = authData

    const subAccountData = users.find((user) => user.email === currentUserEmail && user.isSubAccount)
    const subUsers = _get(subAccountData, 'subUsers', [])

    const hasFilledAccounts = getFilledAccounts(accounts).length > 0
    const hasSubAccount = !!users.find(user => user.email === currentUserEmail && user.isSubAccount)

    return (
      <div className='sub-account'>
        {isSubAccount && (
          <div className='sub-account-controls'>
            <RemoveSubAccount authData={authData} />
          </div>
        )}
        {subUsers.length > 0 && (
          <SubUsersList
            email={currentUserEmail}
            isRemovalEnabled={isSubAccount}
            onToggle={this.onSubUserToggle}
            subUsers={subUsers}
            subUsersToRemove={subUsersToRemove}
          />
        )}
        {!isSubAccount && !hasSubAccount && <div className='subtitle'>{t('subaccounts.create')}</div>}
        {isSubAccount && (
          <>
            <SubUsersAdd
              accounts={accounts}
              authData={authData}
              onChange={this.onSubUsersChange}
              users={users}
            />
            <Button
              className='sub-account-confirm'
              disabled={!hasFilledAccounts && !subUsersToRemove.length}
              intent={Intent.PRIMARY}
              onClick={subUsers.length > 0 ? this.updateSubAccount : this.createSubAccount}
            >
              {subUsers.length > 0 ? t('update') : t('timeframe.custom.confirm')}
            </Button>
          </>
        )}
      </div>
    )
  }
}

SubAccount.propTypes = propTypes
SubAccount.defaultProps = defaultProps

export default withTranslation('translations')(SubAccount)
