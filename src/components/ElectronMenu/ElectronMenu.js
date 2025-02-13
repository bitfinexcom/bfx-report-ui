import React from 'react'
import { useSelector } from 'react-redux'
import _map from 'lodash/map'

import { getElectronMenuTitle, getElectronMenuTemplate } from 'state/electronMenu/selectors'

import DropdownMenu from './ElectronMenu.dropdown'

const ElectronMenu = () => {
  const items = useSelector(getElectronMenuTemplate)
  const menuTitle = useSelector(getElectronMenuTitle)

  return (
    <div className='electron-menu'>
      {_map(items, ({ label, submenu }, index) => (
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
