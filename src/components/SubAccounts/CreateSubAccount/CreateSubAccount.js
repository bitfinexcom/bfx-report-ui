import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

import InputGroup from 'ui/InputGroup'
import Select from 'ui/Select'
import Icon from 'icons'

import { propTypes, defaultProps } from './CreateSubAccount.props'

const MAX_ACCOUNTS = 15
const EMPTY_ACCOUNT = {
  email: '',
  password: '',
  isNotProtected: true,
  apiKey: '',
  apiSecret: '',
}

class CreateSubAccount extends PureComponent {
  state = {
    accounts: [EMPTY_ACCOUNT],
  }

  getFilledAccounts = (accounts) => accounts
    .filter((account) => {
      const {
        email,
        password,
        isNotProtected,
        apiKey,
        apiSecret,
      } = account

      return (apiKey && apiSecret) || (email && (isNotProtected || password))
    })

  createSubAccount = () => {
    const { addSubAccounts } = this.props
    const { accounts } = this.state

    const preparedAccountData = this.getFilledAccounts(accounts).map((account) => {
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

    addSubAccounts(preparedAccountData)
  }

  onInputChange = (e, index) => {
    const { accounts } = this.state
    const { name, value } = e.target
    this.setState({
      accounts: accounts.map((account, accountIndex) => {
        if (accountIndex === index) {
          return {
            ...account,
            [name]: value,
          }
        }
        return account
      }),
    })
  }

  onSubAccountEmailChange = (email, index) => {
    const { users } = this.props
    const { accounts } = this.state
    const { isNotProtected = true } = users.find((account) => account.email === email) || {}

    this.setState({
      accounts: accounts.map((account, accountIndex) => {
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
      }),
    })
  }

  onAccountAdd = () => {
    const { accounts } = this.state
    this.setState({
      accounts: accounts.concat(EMPTY_ACCOUNT),
    })
  }

  onAccountRemove = (index) => {
    const { accounts } = this.state

    if (accounts.length === 1) {
      this.setState({
        accounts: [EMPTY_ACCOUNT],
      })
      return
    }

    this.setState({
      accounts: accounts.filter((el, i) => i !== index),
    })
  }

  getTakenAccountOptions = (accounts) => accounts
    .filter((account) => account.email)
    .map((account) => account.email)

  render() {
    const { authData: { email: currentUserEmail }, users, t } = this.props
    const { accounts } = this.state

    const subAccountOptions = users.filter((account) => !account.isSubAccount && account.email !== currentUserEmail)
    const takenAccountOptions = this.getTakenAccountOptions(accounts)

    const hasFilledAccounts = this.getFilledAccounts(accounts).length > 0

    return (
      <div className='section-sub-accounts-create'>
        <div className='subtitle'>{t('subaccounts.create')}</div>
        <div className='section-sub-accounts-create-accounts'>
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
              <div className='section-sub-accounts-create-accounts-account' key={index}>
                {accountOptions.length > 0 && !apiKey && !apiSecret && (
                  <Select
                    className='section-sub-accounts-create-select'
                    items={subAccountOptionsItems}
                    onChange={(accountEmail) => this.onSubAccountEmailChange(accountEmail, index)}
                    popoverClassName='section-sub-accounts-create-select-popover'
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
                  className='section-sub-accounts-create-accounts-account-remove'
                  onClick={() => this.onAccountRemove(index)}
                />
              </div>
            )
          })}
        </div>

        <div className='section-sub-accounts-create-add'>
          {(accounts.length < MAX_ACCOUNTS) && (
            <span className='columns-filter-controls-create color--active' onClick={this.onAccountAdd}>
              {`+ ${t('subaccounts.add_account')}`}
            </span>
          )}
        </div>

        <Button
          className='section-sub-accounts-create-confirm'
          disabled={!hasFilledAccounts}
          intent={Intent.PRIMARY}
          onClick={this.createSubAccount}
        >
          {t('timeframe.custom.confirm')}
        </Button>
      </div>
    )
  }
}

CreateSubAccount.propTypes = propTypes
CreateSubAccount.defaultProps = defaultProps

export default withTranslation('translations')(CreateSubAccount)
