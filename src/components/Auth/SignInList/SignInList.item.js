import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Icons from 'icons'

import UserItemMenu from './SignInList.menu'
import { getUserType, getMenuOptionTitle, getUserTitle } from './SignInList.helpers'

export const SignInListItem = ({
  user,
  handleUserSelect,
  handleAddAccounts,
  handleDeleteAccount,
}) => {
  const { t } = useTranslation()
  const { email, isApiKeysAuth, localUsername } = user

  const addAccounts = useCallback(
    () => handleAddAccounts(email, localUsername),
    [email, localUsername],
  )

  const deleteAccount = useCallback(
    () => handleDeleteAccount(user),
    [user],
  )

  return (
    <div className='sign-in-list--wrapper'>
      <div
        className='sign-in-list--item'
        onClick={() => handleUserSelect(user)}
      >
        <Icons.USER_CIRCLE />
        <div className='sign-in-list--item-description'>
          <p className='sign-in-list--item-title'>
            {getUserTitle(user)}
          </p>
          <p className='sign-in-list--item-type'>
            {t(getUserType(user))}
          </p>
        </div>
      </div>
      {isApiKeysAuth && (
        <div className='sign-in-list--icon'>
          <UserItemMenu
            handleAddAccounts={addAccounts}
            handleAccountsTitle={getMenuOptionTitle(user)}
            handleDeleteAccount={deleteAccount}
          />
        </div>
      )}
    </div>
  )
}

SignInListItem.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isApiKeysAuth: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
    localUsername: PropTypes.string,
  }).isRequired,
  handleUserSelect: PropTypes.func.isRequired,
  handleAddAccounts: PropTypes.func.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
}

export default memo(SignInListItem)
