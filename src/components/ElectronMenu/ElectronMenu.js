import React from 'react'
import { useSelector } from 'react-redux'
// import _size from 'lodash/size'
import _map from 'lodash/map'

import { getElectronMenuTitle, getElectronMenuTemplate } from 'state/electronMenu/selectors'

import AccountMenu from './AccountMenu'

const ElectronMenu = () => {
  const menuTitle = useSelector(getElectronMenuTitle)
  const entries = useSelector(getElectronMenuTemplate)

  console.log('+++entries', entries)

  return (
    <div className='electron-menu'>
      {_map(entries, (entry, index) => (
        <AccountMenu
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
