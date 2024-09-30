import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Radio } from '@blueprintjs/core'
import { isEqual } from '@bitfinex/lib-js-util-base'

import Icon from 'icons'
import config from 'config'
import { tracker } from 'utils/trackers'
import types from 'state/base/constants'

const ThemeSwitcher = ({ theme, setTheme }) => {
  const { t } = useTranslation()

  const switchTheme = (e) => {
    const { value } = e.target
    tracker.trackEvent(value)
    setTheme(value)
  }

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

ThemeSwitcher.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
}

export default ThemeSwitcher
