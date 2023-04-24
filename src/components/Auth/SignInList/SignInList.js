import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import _map from 'lodash/map'

import Icon from 'icons'

import { MODES } from '../Auth'

import UserItem from './SignInList.item'

export const SignInList = ({
  users,
  switchMode,
  handleUserItemSelect,
}) => {
  const { t } = useTranslation()
  console.log('++SignInList users', users)
  return (
    <div className='sign-in-list'>
      {_map(users, (user, index) => (
        <UserItem
          key={index}
          user={user}
          handleUserSelect={handleUserItemSelect}
        />
      ))}
      <div
        className='sign-in-list--item'
        onClick={() => switchMode(MODES.SIGN_UP)}
      >
        <Icon.SIGN_UP />
        <p className='sign-in-list--item-title'>
          {t('auth.addAccount')}
        </p>
      </div>
    </div>
  )
}

SignInList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
  })).isRequired,
  switchMode: PropTypes.func.isRequired,
  handleUserItemSelect: PropTypes.func.isRequired,
}

export default memo(SignInList)
