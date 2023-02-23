import React from 'react'

import Status from 'components/Status'
import PlatformLogo from 'ui/PlatformLogo'
import config from 'config'

import HamburgerMenu from './HamburgerMenu'
import Export from './Export'
import SyncMode from './SyncMode'
import QueryMode from './QueryMode'
import AccountMenu from './AccountMenu'
import TopNavigation from './TopNavigation'

const Header = () => {
  const HOME_URL = config.isElectronApp ? '/' : config.HOME_URL

  return (
    <div className='header'>
      <div className='header-brand'>
        <HamburgerMenu />
        <a href={HOME_URL} className='header-brand-logo'>
          <PlatformLogo />
        </a>
      </div>
      <div className='header-row'>
        <Export />
        <SyncMode />
        <QueryMode />
        <Status />
        <AccountMenu />
        <TopNavigation />
      </div>
    </div>
  )
}

export default Header
