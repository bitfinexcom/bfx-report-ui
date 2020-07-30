import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, InputGroup, Intent } from '@blueprintjs/core'

import Select from 'ui/Select'

import { propTypes, defaultProps } from './AddSubAccount.props'

class AddSubAccount extends PureComponent {
  state = {
    email: '',
    password: '',
    isNotProtected: true,
    apiKey: '',
    apiSecret: '',
  }

  addSubAccount = () => {
    const { addSubAccounts } = this.props
    const {
      email,
      password,
      apiKey,
      apiSecret,
    } = this.state

    const accountData = email
      ? { email, password: password || undefined }
      : { apiKey, apiSecret }
    addSubAccounts([accountData])
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSubAccountEmailChange = (email) => {
    const { users } = this.props
    const { isNotProtected = true } = users.find((account) => account.email === email) || {}
    this.setState({
      email,
      password: '',
      isNotProtected,
      apiKey: '',
      apiSecret: '',
    })
  }

  render() {
    const { authData: { email: currentUserEmail }, users, t } = this.props
    const {
      email,
      password,
      isNotProtected,
      apiKey,
      apiSecret,
    } = this.state
    const subAccountOptions = users.filter((account) => !account.isSubAccount && account.email !== currentUserEmail)
    const subAccountOptionsItems = [
      '',
      ...subAccountOptions.map(account => account.email),
    ]

    return (
      <div className='section-sub-accounts-add'>
        <div className='subtitle'>{t('subaccounts.add')}</div>
        {subAccountOptions.length > 0 && (
          <div className='section-sub-accounts-add-user'>
            <Select
              className='section-sub-accounts-add-select'
              items={subAccountOptionsItems}
              onChange={this.onSubAccountEmailChange}
              popoverClassName='section-sub-accounts-add-select-popover test'
              value={email}
              loading
            />
            {!isNotProtected && (
              <>
                <div className='mt20'>{t('subaccounts.password')}</div>
                <InputGroup
                  id='password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={this.handleInputChange}
                />
              </>
            )}
          </div>
        )}

        {!email && (
          <div className='section-sub-accounts-add-new'>
            <div>{t('subaccounts.api_key')}</div>
            <InputGroup
              id='apiKey'
              type='password'
              name='apiKey'
              value={apiKey}
              onChange={this.handleInputChange}
            />
            <br />
            <div>{t('subaccounts.api_secret')}</div>
            <InputGroup
              id='apiSecret'
              type='password'
              name='apiSecret'
              value={apiSecret}
              onChange={this.handleInputChange}
            />
          </div>
        )}

        <Button
          className='section-sub-accounts-add-confirm'
          disabled={!email && !(apiKey && apiSecret)}
          intent={Intent.PRIMARY}
          onClick={this.addSubAccount}
        >
          {t('timeframe.custom.confirm')}
        </Button>
      </div>
    )
  }
}

AddSubAccount.propTypes = propTypes
AddSubAccount.defaultProps = defaultProps

export default withTranslation('translations')(AddSubAccount)
