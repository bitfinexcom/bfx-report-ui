import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Card, Elevation } from '@blueprintjs/core'

import SectionHeader from 'ui/SectionHeader'
import { filterRestrictedUsers } from './SubAccount/utils'

import SubAccount from './SubAccount'

const SubAccounts = ({ authData, users }) => {
  const { email, password } = authData
  const preparedUsers = useMemo(
    () => filterRestrictedUsers(users),
    [users],
  )

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
      <SubAccount
        users={users}
        authData={authData}
        masterAccount={email}
        userPassword={password}
        allowedUsers={preparedUsers}
      />
    </Card>
  )
}

SubAccounts.propTypes = {
  authData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string,
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
