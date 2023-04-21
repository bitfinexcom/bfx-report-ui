import React, { memo } from 'react'
import PropTypes from 'prop-types'

export const SignInUserItem = ({ user, backToUsersList }) => (
  <div
    className='sign-in-user--item'
    onClick={() => backToUsersList()}
  >
    <p className='sign-in-user--item-title'>
      {user}
    </p>
  </div>
)

SignInUserItem.propTypes = {
  user: PropTypes.string.isRequired,
  backToUsersList: PropTypes.func.isRequired,
}

export default memo(SignInUserItem)
