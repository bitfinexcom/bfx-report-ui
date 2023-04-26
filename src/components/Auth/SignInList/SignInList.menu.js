import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Menu,
  Popover,
  MenuItem,
  Position,
} from '@blueprintjs/core'

import Icon from 'icons'


const UserItemMenu = ({
  togglePrefDialog,
}) => {
  const [isOpen, setIsOpen] = useState(false)


  const togglePopover = (isPopoverOpen) => {
    setIsOpen(isPopoverOpen)

    // const headerBrand = document.getElementsByClassName('header-brand')[0]
    // if (isOpen) {
    //   headerBrand.classList.add('top-navigation--open')
    // } else {
    //   headerBrand.classList.remove('top-navigation--open')
    // }
  }

  const classes = classNames('.sign-in-list--menu', {
    '.sign-in-list--menu-open': isOpen,
  })


  return (
    <div className={classes}>
      <Popover
        minimal
        autoFocus={false}
        position={Position.BOTTOM_RIGHT}
        portalClassName='sign-in-list--menu-portal'
        onOpening={() => togglePopover(true)}
        onClosing={() => togglePopover(false)}
        content={(
          <div className='sign-in-list--menu-content'>
            <Menu>
              <MenuItem
                shouldDismissPopover={false}
                text={'Add accounts'}
                onClick={togglePrefDialog}
                className='bp3-menu-item--account'
              />
            </Menu>
          </div>
          )}
        targetTagName='div'
        popoverClassName='sign-in-list--menu-popover'
      >
        <span>
          <Icon.MORE />
        </span>
      </Popover>
    </div>
  )
}

UserItemMenu.propTypes = {
  email: PropTypes.string.isRequired,
  togglePrefDialog: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default memo(UserItemMenu)
