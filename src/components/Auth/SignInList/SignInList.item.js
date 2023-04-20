import React, { memo } from 'react'
import PropTypes from 'prop-types'
// import { useTranslation } from 'react-i18next'

export const SignInListItem = ({ user }) => {
  // const { t } = useTranslation()
  console.log('++user', user)
  const { email } = user
  return (
    <div className='sign-in-list--item'>
      <p>{email}</p>
    </div>
  )
}

SignInListItem.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
  }).isRequired,
}

export default memo(SignInListItem)
