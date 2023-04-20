import React, { memo } from 'react'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
import _map from 'lodash/map'

import UserItem from './SignInList.item'

export const SignInList = ({ users }) => {
  // const { t } = useTranslation()
  console.log('++SignInList users', users)
  return (
    <>
      {_map(users, user => (<UserItem user={user} />))}
    </>
  )
}


SignInList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
  })).isRequired,
}

export default memo(SignInList)
