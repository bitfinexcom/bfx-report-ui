import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  MenuItem,
  MenuDivider,
} from '@blueprintjs/core'
import _map from 'lodash/map'
import { isEqual } from '@bitfinex/lib-js-util-base'

import types from 'state/electronMenu/constants'
import { executeMenuCommand } from 'state/electronMenu/actions'

const SubMenu = ({ label, items }) => {
  const dispatch = useDispatch()
  console.log('+++item label', label)
  console.log('+++item submenu', items)

  return (
    <div className='electron-menu-submenu'>
      <MenuItem text={label}>
        {_map(items, (item, index) => {
          const {
            id, label: text, type, accelerator, enabled, submenu,
          } = item
          console.log('+++submenu', submenu)

          if (isEqual(type, types.SEPARATOR)) return <MenuDivider key={index} />

          return (
            <MenuItem
              key={index}
              text={text}
              disabled={!enabled}
              label={accelerator}
              onClick={() => dispatch(executeMenuCommand(id))}
            />
          )
        })}
      </MenuItem>
    </div>
  )
}

SubMenu.propTypes = {
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

SubMenu.defaultProps = {
  items: [],
  label: '',
}

export default memo(SubMenu)
