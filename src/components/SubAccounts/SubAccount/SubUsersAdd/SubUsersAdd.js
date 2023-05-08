import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'
import Select from 'ui/Select'
import InputGroup from 'ui/InputGroup'

import { EMPTY_ACCOUNT, MAX_ACCOUNTS } from '../utils'

class SubUsersAdd extends PureComponent {
  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      isNotProtected: PropTypes.bool,
      apiKey: PropTypes.string,
      apiSecret: PropTypes.string,
    })).isRequired,
    addMultipleAccsEnabled: PropTypes.bool.isRequired,
    shouldFilterCurrentUser: PropTypes.bool.isRequired,
    masterAccount: PropTypes.string,
    authData: PropTypes.shape({
      email: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      isSubAccount: PropTypes.bool.isRequired,
      isNotProtected: PropTypes.bool.isRequired,
    })).isRequired,
  }

  static defaultProps = {
    masterAccount: undefined,
  }

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
      t,
      users,
      accounts,
      authData,
      masterAccount,
      addMultipleAccsEnabled,
      shouldFilterCurrentUser,
    } = this.props
    const { email: currentUserEmail } = authData

    const subAccountOptions = users.filter((account) => (
      !account.isSubAccount
      && account.email !== masterAccount
      && (shouldFilterCurrentUser ? account.email !== currentUserEmail : true)
    ))
    const takenAccountOptions = this.getTakenAccountOptions(accounts)
    const selectClassName = addMultipleAccsEnabled
      ? 'sub-account-create-select' : 'bitfinex-auth-email'
    const selectPopoverClassName = addMultipleAccsEnabled
      ? 'sub-users-add-select-popover' : 'bitfinex-auth-email-popover'

    return (
      <div className='sub-users-add'>
        <div className='sub-users-add-accounts'>
          {accounts.map((account, index) => {
            const {
              email,
              apiKey,
              password,
              apiSecret,
              isNotProtected,
            } = account

            const accountOptions = subAccountOptions
              .filter((acc) => acc.email === email || !takenAccountOptions.includes(acc.email))
              .map((accountOption) => accountOption.email)
            const subAccountOptionsItems = [
              '',
              ...accountOptions,
            ]
            const showSubAccountsSelect = accountOptions.length > 0 && !apiKey && !apiSecret

            return (
              /* eslint-disable-next-line react/no-array-index-key */
              <div className='sub-users-add-accounts-account' key={index}>
                {showSubAccountsSelect && (
                  <>
                    <div className='account-title'>
                      <div className='account-title--label'>
                        {t('subaccounts.select')}
                      </div>
                      <div
                        className='account-title--remove'
                        onClick={() => this.onAccountRemove(index)}
                      >
                        {t('subaccounts.remove_item')}
                      </div>
                    </div>
                    <Select
                      loading
                      value={email}
                      className={selectClassName}
                      items={subAccountOptionsItems}
                      popoverClassName={selectPopoverClassName}
                      onChange={(accountEmail) => this.onSubAccountEmailChange(accountEmail, index)}
                    />
                  </>
                )}
                {!isNotProtected && (
                  <InputGroup
                    name='password'
                    value={password}
                    label={t('subaccounts.password')}
                    onChange={(e) => this.onInputChange(e, index)}
                  />
                )}
                {!email && (
                  <>
                    <InputGroup
                      name='apiKey'
                      value={apiKey}
                      label={t('subaccounts.api_key')}
                      showRemoveLink={!showSubAccountsSelect}
                      linkLabel={t('subaccounts.remove_item')}
                      onRemove={() => this.onAccountRemove(index)}
                      onChange={(e) => this.onInputChange(e, index)}
                    />
                    <InputGroup
                      name='apiSecret'
                      value={apiSecret}
                      label={t('subaccounts.api_secret')}
                      onChange={(e) => this.onInputChange(e, index)}
                    />
                  </>
                )}
              </div>
            )
          })}
        </div>

        {(addMultipleAccsEnabled && accounts.length < MAX_ACCOUNTS) && (
          <div className='sub-users-add-new'>
            <span
              onClick={this.onAccountAdd}
              className='sub-users-add-new-btn color--active'
            >
              <Icon.PLUS_CIRCLE />
              <span className='add-new-btn-title'>
                {t('subaccounts.add_account')}
              </span>
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default withTranslation('translations')(SubUsersAdd)
