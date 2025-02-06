import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  Position,
  PopoverInteractionKind,
} from '@blueprintjs/core'
import _map from 'lodash/map'
import classNames from 'classnames'
import { isEqual } from '@bitfinex/lib-js-util-base'

import types from 'state/electronMenu/constants'
import { executeMenuCommand } from 'state/electronMenu/actions'

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
        hoverOpenDelay={0}
        hoverCloseDelay={0}
        targetTagName='div'
        position={Position.BOTTOM_LEFT}
        interactionKind={PopoverInteractionKind.HOVER}
        content={(
          <div className='electron-menu-item-content'>
            <Menu>
              {_map(items, (item, index) => {
                const {
                  id, label: text, type, accelerator, enabled, submenu,
                } = item

                if (isEqual(type, types.SEPARATOR)) return <MenuDivider />

                return (
                  <MenuItem
                    key={index}
                    text={text}
                    disabled={enabled}
                    label={accelerator}
                  />
                )
              })}
            </Menu>
          </div>
        )}
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
