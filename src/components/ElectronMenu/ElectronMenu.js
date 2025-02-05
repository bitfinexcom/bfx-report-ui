import React from 'react'
import { useSelector } from 'react-redux'
import _map from 'lodash/map'

import { getElectronMenuTitle, getElectronMenuTemplate } from 'state/electronMenu/selectors'

import DropdownItem from './ElectronMenu.dropdown'

const ElectronMenu = () => {
  const menuTitle = useSelector(getElectronMenuTitle)
  const entries = useSelector(getElectronMenuTemplate)

  console.log('+++entries', entries)

  return (
    <div className='electron-menu'>
      {_map(entries, (entry, index) => (
        <DropdownItem
          key={index}
          label={entry?.label}
          items={entries[index]?.submenu}
        />
      ))}
      <div className='electron-menu-title'>
        {menuTitle}
      </div>
    </div>
  )
}

export default ElectronMenu
