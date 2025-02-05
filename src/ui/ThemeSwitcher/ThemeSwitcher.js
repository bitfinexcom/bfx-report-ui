import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Radio } from '@blueprintjs/core'
import { isEqual } from '@bitfinex/lib-js-util-base'

import Icon from 'icons'
import config from 'config'
import { tracker } from 'utils/trackers'
import types from 'state/base/constants'
import { setTheme } from 'state/base/actions'
import { getTheme } from 'state/base/selectors'

const ThemeSwitcher = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const theme = useSelector(getTheme)

  const switchTheme = useCallback((e) => {
    const { value } = e.target
    tracker.trackEvent(value)
    dispatch(setTheme(value))
  }, [dispatch, tracker])

  if (config.hideSwitchTheme) {
    return null
  }

  return (
    <div className='theme-switcher'>
      <div className='theme-switcher-theme theme-switcher-theme--dark'>
        <Icon.DARK_THEME />
        <Radio
          onChange={switchTheme}
          label={t('theme.dark')}
          value={types.THEME_DARK}
          checked={isEqual(theme, types.THEME_DARK)}
        />
      </div>
      <div className='theme-switcher-theme theme-switcher-theme--light'>
        <Icon.LIGHT_THEME />
        <Radio
          onChange={switchTheme}
          label={t('theme.light')}
          value={types.THEME_LIGHT}
          checked={isEqual(theme, types.THEME_LIGHT)}
        />
      </div>
    </div>
  )
}

export default ThemeSwitcher
