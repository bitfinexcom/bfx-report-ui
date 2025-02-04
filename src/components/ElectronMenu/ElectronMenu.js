import React from 'react'
import { useSelector } from 'react-redux'

import { getElectronMenuTitle } from 'state/electronMenu/selectors'

import AccountMenu from './AccountMenu'

const ElectronMenu = () => {
  const menuTitle = useSelector(getElectronMenuTitle)

  return (
    <div className='electron-menu'>
      <AccountMenu />
      <AccountMenu />
      <AccountMenu />
      <AccountMenu />
      <div className='electron-menu-title'>
        {menuTitle}
      </div>
    </div>
  )
}

export default ElectronMenu
