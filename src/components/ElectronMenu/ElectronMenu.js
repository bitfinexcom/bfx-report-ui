import React from 'react'
import { useSelector } from 'react-redux'
import _map from 'lodash/map'

import { getElectronMenuTitle, getElectronMenuTemplate } from 'state/electronMenu/selectors'

import DropdownMenu from './ElectronMenu.dropdown'

const ElectronMenu = () => {
  const menuTitle = useSelector(getElectronMenuTitle)
  const items = useSelector(getElectronMenuTemplate)

  console.log('+++entries', items)

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
