import React from 'react'
import { useSelector } from 'react-redux'
import _map from 'lodash/map'
import _filter from 'lodash/filter'

import { getElectronMenuTitle, getElectronMenuTemplate } from 'state/electronMenu/selectors'

import DropdownMenu from './ElectronMenu.dropdown'

const ElectronMenu = () => {
  const items = useSelector(getElectronMenuTemplate)
  const menuTitle = useSelector(getElectronMenuTitle)
  const visibleItems = _filter(items, 'visible')

  return (
    <div className='electron-menu'>
      {_map(visibleItems, ({ label, submenu }, index) => (
        <DropdownMenu
          key={index}
          label={label}
          items={submenu}
        />
      ))}
      <div className='electron-menu-title'>
        {menuTitle}
      </div>
    </div>
  )
}

export default ElectronMenu
