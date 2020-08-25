import React, { PureComponent } from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import _get from 'lodash/get'

import SectionHeader from 'ui/SectionHeader'

import CreateSubAccount from './CreateSubAccount'
import RemoveSubAccount from './RemoveSubAccount'
import SubAccountLogin from './SubAccountLogin'
import { propTypes, defaultProps } from './SubAccounts.props'

class SubAccounts extends PureComponent {
  render() {
    const {
      authData,
      users,
    } = this.props
    const { email, isSubAccount } = authData
    const subAccountData = users.find((user) => user.email === email && user.isSubAccount)
    const subUsers = _get(subAccountData, 'subUsers', [])

    const hasSubAccount = !!users.find(user => user.email === email && user.isSubAccount)

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader
          filter={false}
          timeframe={false}
          title='subaccounts.title'
        />
        <div className='section-sub-accounts'>
          {subUsers.length > 0 && (
            <div className='section-sub-accounts-current'>
              {subUsers.map((account) => (<div key={account.email}>{account.email}</div>))}
            </div>
          )}
          {hasSubAccount && <RemoveSubAccount authData={authData} />}
          {hasSubAccount && !isSubAccount && <SubAccountLogin authData={authData} />}
          {!hasSubAccount && <CreateSubAccount authData={authData} users={users} />}
        </div>
      </Card>
    )
  }
}

SubAccounts.propTypes = propTypes
SubAccounts.defaultProps = defaultProps

export default SubAccounts
