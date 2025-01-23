import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Menu,
  MenuItem,
  Popover,
  Position,
  PopoverInteractionKind,
} from '@blueprintjs/core'

// import config from 'config'

import { openHelp } from '../utils'

const AccountMenu = ({
  t,
}) => (
  <div
    className={classNames(
      '.electron-menu-item',
    )}
  >
    <Popover
      minimal
      position={Position.BOTTOM_LEFT}
      content={(
        <div className='electron-menu-item-content'>
          <Menu>
            <MenuItem
              onClick={openHelp}
              text={t('header.help')}
            />
            <MenuItem
              onClick={openHelp}
              text={t('header.help')}
            />
            <MenuItem
              onClick={openHelp}
              text={t('header.help')}
            />
            <MenuItem
              onClick={openHelp}
              text={t('header.help')}
            />
            <MenuItem
              onClick={openHelp}
              text={t('header.help')}
            />
            <MenuItem
              onClick={openHelp}
              text={t('header.help')}
            />
            <MenuItem
              onClick={openHelp}
              text={t('header.help')}
            />
          </Menu>
        </div>
            )}
      targetTagName='div'
      interactionKind={PopoverInteractionKind.HOVER}
    >
      <div className='electron-menu-item-wrapper'>
        <div className='electron-menu-item-target'>
          <span className='electron-menu-item-username'>
            {'Menu Item'}
          </span>
        </div>
      </div>
    </Popover>
  </div>
)

AccountMenu.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default memo(AccountMenu)
