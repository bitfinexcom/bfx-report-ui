import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Radio } from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import { tracker } from 'utils/trackers'

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
          checked={theme === 'theme-dark'}
          label={t('theme.dark')}
          onChange={switchTheme}
          value='theme-dark'
        />
      </div>
      <div className='theme-switcher-theme theme-switcher-theme--light'>
        <Icon.LIGHT_THEME />
        <Radio
          checked={theme === 'theme-light'}
          label={t('theme.light')}
          onChange={switchTheme}
          value='theme-light'
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
