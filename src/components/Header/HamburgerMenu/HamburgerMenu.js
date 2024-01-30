import React from 'react'
import { useDispatch } from 'react-redux'

import Icon from 'icons'
import { tracker } from 'utils/trackers'
import { toggleNavigationDrawer } from 'state/ui/actions'

const HamburgerMenu = () => {
  const dispatch = useDispatch()
  const toggleMenu = () => {
    tracker.trackEvent('Hamburger Menu', 'Navigation')
    dispatch(toggleNavigationDrawer())
  }

  return (
    <div
      className='hamburger-menu'
      onClick={() => toggleMenu()}
    >
      <Icon.HAMBURGER_MENU />
    </div>
  )
}

export default HamburgerMenu
