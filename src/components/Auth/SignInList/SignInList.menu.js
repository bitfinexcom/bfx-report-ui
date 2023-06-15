import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Menu,
  Popover,
  MenuItem,
  Position,
} from '@blueprintjs/core'

import Icon from 'icons'

const UserItemMenu = ({
  showAddAccounts,
  handleAddAccounts,
  handleAccountsTitle,
  handleDeleteAccount,
}) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const togglePopover = (isPopoverOpen) => {
    setIsOpen(isPopoverOpen)
  }

  const classes = classNames('.sign-in-list--menu', {
    '.sign-in-list--menu-open': isOpen,
  })

  return (
    <div className={classes}>
      <Popover
        minimal
        autoFocus={false}
        usePortal={false}
        position={Position.BOTTOM_RIGHT}
        onOpening={() => togglePopover(true)}
        onClosing={() => togglePopover(false)}
        content={(
          <div className='sign-in-list--menu-content'>
            <Menu>
              <MenuItem
                shouldDismissPopover={false}
                onClick={() => handleDeleteAccount()}
                className='bp3-menu-item--account'
                text={t('auth.removeAccount')}
              />
              {showAddAccounts && (
                <MenuItem
                  shouldDismissPopover={false}
                  onClick={() => handleAddAccounts()}
                  className='bp3-menu-item--account'
                  text={t(handleAccountsTitle)}
                />
              )
             }
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
  showAddAccounts: PropTypes.bool.isRequired,
  handleAddAccounts: PropTypes.func.isRequired,
  handleAccountsTitle: PropTypes.string.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
}

export default memo(UserItemMenu)
