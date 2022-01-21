import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'

import SectionHeader from 'ui/SectionHeader'

import SubAccount from './SubAccount'

const SubAccounts = ({ authData, users }) => (
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

SubAccounts.propTypes = {
  authData: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    subUsers: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
    })),
  })).isRequired,
}

export default memo(SubAccounts)
