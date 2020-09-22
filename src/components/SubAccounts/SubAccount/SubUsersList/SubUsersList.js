import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'icons'

const SubUsersList = (props) => {
  const { onToggle, subUsers, subUsersToRemove } = props

  return (
    <div className='sub-users-list'>
      {subUsers.map((account) => {
        const { email } = account
        const isBeingRemoved = subUsersToRemove.includes(email)
        const classes = classNames('sub-users-list-item', { 'sub-users-list-item--removing': isBeingRemoved })

        return (
          <div className={classes} key={email}>
            <div className='sub-users-list-item-user'>{email}</div>
            <Icon.BIN
              className='sub-users-list-item-icon'
              onClick={() => onToggle(email)}
            />
          </div>
        )
      })}
    </div>
  )
}

SubUsersList.propTypes = {
  onToggle: PropTypes.func.isRequired,
  subUsers: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
  })).isRequired,
  subUsersToRemove: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default SubUsersList
