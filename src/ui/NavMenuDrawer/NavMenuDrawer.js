import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer, Position, Classes } from '@blueprintjs/core'

import Icons from 'icons'
import NavMenu from 'ui/NavMenu'
import { toggleNavigationDrawer } from 'state/ui/actions'
import { getIsNavigationDrawerOpen } from 'state/ui/selectors'


const NavMenuDrawer = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isNavigationDrawerOpen = useSelector(getIsNavigationDrawerOpen)

  return (
    <div>
      <Drawer
        position={Position.LEFT}
        icon={<Icons.PIE_CHART />}
        className='nav-menu-drawer'
        title={t('navItems.reports')}
        isOpen={isNavigationDrawerOpen}
        onClose={() => dispatch(toggleNavigationDrawer())}
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

export default NavMenuDrawer
