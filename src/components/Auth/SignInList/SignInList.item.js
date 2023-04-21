import React, { memo } from 'react'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'
import Icon from 'icons'

export const SignInListItem = ({ user, handleUserSelect }) => {
  // const { t } = useTranslation()
  console.log('++user', user)
  const { email } = user
  return (
    <div
      className='sign-in-list--item'
      onClick={() => handleUserSelect(email)}
    >
      <Icon.USER_CIRCLE />
      <p className='sign-in-list--item-title'>
        {email}
      </p>
    </div>
  )
}

SignInListItem.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
  }).isRequired,
  handleUserSelect: PropTypes.func.isRequired,
}

export default memo(SignInListItem)
