import React from 'react'
import {
  Popover,
  Position,
  MenuItem,
} from '@blueprintjs/core'

import Icons from 'icons'
import NavMenu from 'ui/NavMenu'

const NavMenuPopover = () => (
  <Popover
    position={Position.BOTTOM}
    popoverClassName='bitfinex-nav-menu--popover'
    content={(
      <NavMenu
        className='bitfinex-nav-menu--popover-menu'
        showMenuPopover={false}
      />
        )}
  >
    <MenuItem
      icon={<Icons.HAMBURGER_MENU />}
    />
  </Popover>
)

export default NavMenuPopover
