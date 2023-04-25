import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Icons from 'icons'

import { getUserType } from './SignInList.helpers'

export const SignInListItem = ({ user, handleUserSelect }) => {
  const { t } = useTranslation()
  console.log('++user', user)
  const { email } = user

  return (
    <div className='sign-in-list--wrapper'>
      <div
        className='sign-in-list--item'
        onClick={() => handleUserSelect(user)}
      >
        <Icons.USER_CIRCLE />
        <div className='sign-in-list--item-description'>
          <p className='sign-in-list--item-title'>
            {email}
          </p>
          <p className='sign-in-list--item-type'>
            {t(getUserType(user))}
          </p>
        </div>
      </div>
      <div className='sign-in-list--icon'>
        <Icons.MORE />
      </div>
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
