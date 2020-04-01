import React from 'react'

import Status from 'components/Status'
import SyncMode from 'components/SyncMode'
import PlatformLogo from 'ui/PlatformLogo'
import constants from 'state/query/constants'
import { platform } from 'var/config'

import TimeFrame from './TimeFrame'
import TimeFrameShortcut from './TimeFrameShortcut'
import Export from './Export'
import AccountMenu from './AccountMenu'

const { REACT_APP_ELECTRON } = process.env

const Header = () => {
  const renderSyncMode = platform.showFrameworkMode ? <SyncMode /> : null
  const HOME_URL = REACT_APP_ELECTRON ? '/' : platform.HOME_URL

  return (
    <div className='header'>
      <div className='header-brand'>
        <a href={HOME_URL} className='header-brand-logo'>
          <PlatformLogo />
        </a>
      </div>
      <div className='header-timeframe'>
        <TimeFrame />
      </div>
      <TimeFrameShortcut
        title='timeframe.2w'
        type={constants.TIME_RANGE_LAST_2WEEKS}
      />
      <TimeFrameShortcut
        title='timeframe.past_month'
        type={constants.TIME_RANGE_PAST_MONTH}
      />
      <Export />

      {renderSyncMode}
      <Status />
      <AccountMenu />
    </div>
  )
}

export default Header
