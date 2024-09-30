import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Radio } from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'
import { tracker } from 'utils/trackers'

class ThemeSwitcher extends PureComponent {
  switchTheme = (e) => {
    const { value } = e.target
    const { setTheme } = this.props
    tracker.trackEvent(value)
    setTheme(value)
  }

  render() {
    const { theme, t } = this.props

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
            onChange={this.switchTheme}
            value='theme-dark'
          />
        </div>

        <div className='theme-switcher-theme theme-switcher-theme--light'>
          <Icon.LIGHT_THEME />
          <Radio
            checked={theme === 'theme-light'}
            label={t('theme.light')}
            onChange={this.switchTheme}
            value='theme-light'
          />
        </div>
      </div>
    )
  }
}

ThemeSwitcher.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
}

export default withTranslation('translations')(ThemeSwitcher)
