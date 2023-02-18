import React from 'react'
import { useDispatch } from 'react-redux'

import Icon from 'icons'
import { toggleNavigationDrawer } from 'state/ui/actions'

const HamburgerMenu = () => {
  const dispatch = useDispatch()

  return (
    <div
      className='hamburger-menu'
      onClick={() => dispatch(toggleNavigationDrawer())}
    >
      <Icon.HAMBURGER_MENU />
    </div>
  )
}

export default HamburgerMenu
