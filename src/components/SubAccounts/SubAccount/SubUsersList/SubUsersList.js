import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _map from 'lodash/map'
import _isEqual from 'lodash/isEqual'

import { removeSubAccount } from 'state/subAccounts/actions'

const SubUsersList = ({
  email,
  password,
  onToggle,
  subUsers,
  subUsersToRemove,
  isRemovalEnabled,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const mainAccount = subUsers.find((subUser) => subUser.email === email)
  const subUsersWithoutMainAccount = subUsers.filter((subUser) => subUser.email !== email)
  const usersList = [mainAccount, ...subUsersWithoutMainAccount]

  return (
    <div className='sub-users-list'>
      {_map(usersList, (account) => {
        const { email: accountEmail } = account
        const isBeingRemoved = subUsersToRemove.includes(accountEmail)
        const classes = classNames('sub-users-list-item', { 'sub-users-list-item--removing': isBeingRemoved })

        return (
          <div className={classes} key={accountEmail}>
            <div className='account-title'>
              <div className='account-title--label'>
                {t('subaccounts.sub_account')}
              </div>
              {isRemovalEnabled && _isEqual(email, accountEmail) && (
                <div
                  className='account-title--remove'
                  onClick={() => dispatch(removeSubAccount({ masterAccount: email, password }))}
                >
                  {t('subaccounts.remove_item')}
                </div>
              )}
              {isRemovalEnabled && !_isEqual(email, accountEmail) && (
                <div
                  className='account-title--remove'
                  onClick={() => onToggle(accountEmail)}
                >
                  {t('subaccounts.remove_item')}
                </div>
              )}
            </div>
            <div className='sub-users-list-item-user'>
              {accountEmail}
            </div>
          </div>
        )
      })}
    </div>
  )
}

SubUsersList.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string,
  isRemovalEnabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  onToggle: PropTypes.func,
  subUsers: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
  })).isRequired,
  subUsersToRemove: PropTypes.arrayOf(PropTypes.string),
}

SubUsersList.defaultProps = {
  onToggle: () => {},
  subUsersToRemove: [],
  isRemovalEnabled: true,
  password: undefined,
}

export default memo(SubUsersList)
