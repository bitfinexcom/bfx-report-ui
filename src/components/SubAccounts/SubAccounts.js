import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'

import SectionHeader from 'ui/SectionHeader'

import AddSubAccount from './AddSubAccount'
import { propTypes, defaultProps } from './SubAccounts.props'

class SubAccounts extends PureComponent {
  constructor(props) {
    super()

    const { fetchSubAccounts } = props
    fetchSubAccounts()
  }

  render() {
    const {
      authData,
      subUsers,
      users,
      t,
    } = this.props

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
              <div className='subtitle'>{t('subaccounts.current')}</div>
              {subUsers.map((account) => (<div>{account.email}</div>))}
            </div>
          )}
          <AddSubAccount authData={authData} users={users} />
        </div>
      </Card>
    )
  }
}

SubAccounts.propTypes = propTypes
SubAccounts.defaultProps = defaultProps

export default withTranslation('translations')(SubAccounts)
