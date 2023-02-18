import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Drawer, Position, Classes } from '@blueprintjs/core'
import NavMenu from 'ui/NavMenu'

import Icons from 'icons'
import { toggleNavigationDrawer } from 'state/ui/actions'


const NavMenuDrawer = ({
  // t,
  isNavigationDrawerOpen,
}) => {
  const dispatch = useDispatch()

  return (
    <div>
      <Drawer
        icon={<Icons.PIE_CHART />}
        title='Reports'
        className='nav-menu-drawer'
        isOpen={isNavigationDrawerOpen}
        onClose={() => dispatch(toggleNavigationDrawer())}
        position={Position.LEFT}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <NavMenu />
          </div>
        </div>
      </Drawer>
    </div>
  )
}

NavMenuDrawer.propTypes = {
  isNavigationDrawerOpen: PropTypes.bool.isRequired,
}

export default memo(NavMenuDrawer)
