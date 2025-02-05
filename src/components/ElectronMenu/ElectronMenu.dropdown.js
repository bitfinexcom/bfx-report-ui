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

import { openHelp } from './utils'

const DropdownMenu = ({ label, items }) => {
  console.log('+++item label', label)
  console.log('+++item submenu', items)

  return (
    <div
      className={classNames(
        'electron-menu-item',
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
                text={'HELP'}
              />
              <MenuItem
                onClick={openHelp}
                text={'HELP'}
              />
              <MenuItem
                onClick={openHelp}
                text={'HELP'}
              />
              <MenuItem
                text={'HELP'}
                onClick={openHelp}
              >
                <MenuItem
                  onClick={openHelp}
                  text={'HELP2'}
                />
                <MenuItem
                  onClick={openHelp}
                  text={'HELP'}
                />
                <MenuItem
                  onClick={openHelp}
                  text={'HELP'}
                />
              </MenuItem>
              <MenuItem
                onClick={openHelp}
                text={'HELP'}
              />
            </Menu>
          </div>
        )}
        targetTagName='div'
        hoverOpenDelay={0}
        hoverCloseDelay={0}
        interactionKind={PopoverInteractionKind.HOVER}
      >
        <div className='electron-menu-item-wrapper'>
          <div className='electron-menu-item-target'>
            <span className='electron-menu-item-username'>
              {label}
            </span>
          </div>
        </div>
      </Popover>
    </div>
  )
}

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool,
    enabled: PropTypes.bool,
    visible: PropTypes.bool,
    submenu: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    accelerator: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  })),
  label: PropTypes.string,
}

DropdownMenu.defaultProps = {
  items: [],
  label: '',
}

export default memo(DropdownMenu)
