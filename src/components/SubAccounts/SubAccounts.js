import React, { PureComponent } from 'react'
import { Card, Elevation } from '@blueprintjs/core'

import SectionHeader from 'ui/SectionHeader'

import SubAccount from './SubAccount'
import { propTypes, defaultProps } from './SubAccounts.props'

class SubAccounts extends PureComponent {
  render() {
    const { authData, users } = this.props

    return (
      <Card
        elevation={Elevation.ZERO}
        className='sub-accounts col-lg-12 col-md-12 col-sm-12 col-xs-12'
      >
        <SectionHeader
          filter={false}
          timeframe={false}
          title='subaccounts.title'
        />
        <SubAccount authData={authData} users={users} />
      </Card>
    )
  }
}

SubAccounts.propTypes = propTypes
SubAccounts.defaultProps = defaultProps

export default SubAccounts
