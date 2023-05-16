import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _isEqual from 'lodash/isEqual'

import { removeSubAccount } from 'state/subAccounts/actions'

const SubUsersList = ({
  email,
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
      {usersList.map((account) => {
        const { email: accountEmail } = account
        const isBeingRemoved = subUsersToRemove.includes(accountEmail)
        const classes = classNames('sub-users-list-item', { 'sub-users-list-item--removing': isBeingRemoved })
        console.log('+++emaill', email)
        console.log('+++accountEmail', accountEmail)

        return (
          <div className={classes} key={accountEmail}>
            <div className='account-title'>
              <div className='account-title--label'>
                {t('subaccounts.sub_account')}
              </div>
              {isRemovalEnabled && _isEqual(email, accountEmail) && (
                <div
                  className='account-title--remove'
                  onClick={() => dispatch(removeSubAccount(email))}
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
            <div className='sub-users-list-item-user'>{accountEmail}</div>
            {/* {isRemovalEnabled && email !== accountEmail && (
              <Icon.BIN
                className='sub-users-list-item-icon'
                onClick={() => onToggle(accountEmail)}
              />
            )} */}
          </div>
        )
      })}
    </div>
  )
}

SubUsersList.propTypes = {
  email: PropTypes.string.isRequired,
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
}

export default memo(SubUsersList)
