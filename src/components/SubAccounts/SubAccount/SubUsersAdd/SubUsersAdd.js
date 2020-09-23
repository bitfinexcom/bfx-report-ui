import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'

import InputGroup from 'ui/InputGroup'
import Select from 'ui/Select'
import Icon from 'icons'

import { propTypes, defaultProps } from './SubUsersAdd.props'
import { EMPTY_ACCOUNT, MAX_ACCOUNTS } from '../utils'

class SubUsersAdd extends PureComponent {
  onInputChange = (e, index) => {
    const { accounts, onChange } = this.props
    const { name, value } = e.target

    const updatedAccounts = accounts.map((account, accountIndex) => {
      if (accountIndex === index) {
        return {
          ...account,
          [name]: value,
        }
      }
      return account
    })
    onChange(updatedAccounts)
  }

  onSubAccountEmailChange = (email, index) => {
    const { accounts, onChange, users } = this.props
    const { isNotProtected = true } = users.find((account) => account.email === email) || {}

    const updatedAccounts = accounts.map((account, accountIndex) => {
      if (accountIndex === index) {
        return {
          email,
          password: '',
          isNotProtected,
          apiKey: '',
          apiSecret: '',
        }
      }
      return account
    })
    onChange(updatedAccounts)
  }

  onAccountAdd = () => {
    const { accounts, onChange } = this.props
    onChange(accounts.concat(EMPTY_ACCOUNT))
  }

  onAccountRemove = (index) => {
    const { accounts, onChange } = this.props

    if (accounts.length === 1) {
      onChange([EMPTY_ACCOUNT])
      return
    }

    onChange(accounts.filter((el, i) => i !== index))
  }

  getTakenAccountOptions = (accounts) => accounts
    .filter((account) => account.email)
    .map((account) => account.email)

  render() {
    const {
      accounts,
      authData,
      users,
      t,
    } = this.props
    const { email: currentUserEmail } = authData

    const subAccountOptions = users.filter((account) => !account.isSubAccount && account.email !== currentUserEmail)
    const takenAccountOptions = this.getTakenAccountOptions(accounts)

    return (
      <div className='sub-users-add'>
        <div className='sub-users-add-accounts'>
          {accounts.map((account, index) => {
            const {
              email,
              password,
              isNotProtected,
              apiKey,
              apiSecret,
            } = account

            const accountOptions = subAccountOptions
              .filter((acc) => acc.email === email || !takenAccountOptions.includes(acc.email))
              .map((accountOption) => accountOption.email)
            const subAccountOptionsItems = [
              '',
              ...accountOptions,
            ]

            return (
              /* eslint-disable-next-line react/no-array-index-key */
              <div className='sub-users-add-accounts-account' key={index}>
                {accountOptions.length > 0 && !apiKey && !apiSecret && (
                  <Select
                    className='sub-account-create-select'
                    items={subAccountOptionsItems}
                    onChange={(accountEmail) => this.onSubAccountEmailChange(accountEmail, index)}
                    popoverClassName='sub-users-add-select-popover'
                    value={email}
                    loading
                  />
                )}
                {!isNotProtected && (
                  <InputGroup
                    label={t('subaccounts.password')}
                    name='password'
                    onChange={(e) => this.onInputChange(e, index)}
                    value={password}
                  />
                )}
                {!email && (
                  <>
                    <InputGroup
                      label={t('subaccounts.api_key')}
                      name='apiKey'
                      value={apiKey}
                      onChange={(e) => this.onInputChange(e, index)}
                    />
                    <InputGroup
                      label={t('subaccounts.api_secret')}
                      name='apiSecret'
                      value={apiSecret}
                      onChange={(e) => this.onInputChange(e, index)}
                    />
                  </>
                )}
                <Icon.BIN
                  className='sub-users-add-accounts-account-remove'
                  onClick={() => this.onAccountRemove(index)}
                />
              </div>
            )
          })}
        </div>

        {(accounts.length < MAX_ACCOUNTS) && (
          <div className='sub-users-add-new'>
            <span className='sub-users-add-new-btn color--active' onClick={this.onAccountAdd}>
              {`+ ${t('subaccounts.add_account')}`}
            </span>
          </div>
        )}
      </div>
    )
  }
}

SubUsersAdd.propTypes = propTypes
SubUsersAdd.defaultProps = defaultProps

export default withTranslation('translations')(SubUsersAdd)
