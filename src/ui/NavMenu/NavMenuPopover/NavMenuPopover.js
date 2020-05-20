import React, { PureComponent } from 'react'
import { MenuItem, Popover, Position } from '@blueprintjs/core'

import Icons from 'icons'
import NavMenu from 'ui/NavMenu'

class NavMenuPopover extends PureComponent {
  render() {
    return (
      <Popover
        popoverClassName='bitfinex-nav-menu--popover'
        className='test'
        content={(
          <NavMenu
            className='bitfinex-nav-menu--popover-menu'
            showMenuPopover={false}
          />
        )}
        position={Position.BOTTOM}
      >
        <MenuItem
          icon={<Icons.HAMBURGER_MENU />}
        />
      </Popover>
    )
  }
}

export default NavMenuPopover
