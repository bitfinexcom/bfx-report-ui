import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { MenuItem } from '@blueprintjs/core'
import _map from 'lodash/map'
import _filter from 'lodash/filter'

import { executeMenuCommand } from 'state/electronMenu/actions'

// same as Blueprint's default submenu modifiers, but with -1px offset instead of -5px:
// electron menus have no padding to compensate, only the 1px border
const SUBMENU_POPOVER_PROPS = {
  modifiers: {
    offset: { offset: -1 },
    flip: { boundariesElement: 'viewport', padding: 20 },
    preventOverflow: { boundariesElement: 'viewport', padding: 20 },
  },
}

const SubMenu = ({ label, items }) => {
  const dispatch = useDispatch()
  const visibleItems = _filter(items, 'visible')

  return (
    <div className='electron-menu-submenu'>
      <MenuItem text={label} popoverProps={SUBMENU_POPOVER_PROPS}>
        {_map(visibleItems, ({
          id, label: itemLabel, accelerator, enabled,
        }, index) => (
          <MenuItem
            key={index}
            text={itemLabel}
            disabled={!enabled}
            label={accelerator}
            className='submenu-item'
            onClick={() => dispatch(executeMenuCommand(id))}
          />
        ))}
      </MenuItem>
    </div>
  )
}

SubMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    enabled: PropTypes.bool,
    visible: PropTypes.bool,
    accelerator: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  })),
  label: PropTypes.string,
}

SubMenu.defaultProps = {
  items: [],
  label: '',
}

export default memo(SubMenu)
