import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Radio } from '@blueprintjs/core'

import Icon from 'icons'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './ThemeSwitcher.props'

class ThemeSwitcher extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  switchTheme = (e) => {
    const { value } = e.target
    const { setTheme } = this.props
    setTheme(value)
  }

  render() {
    const { theme, t } = this.props

    if (platform.hideSwitchTheme) {
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

export default withTranslation('translations')(ThemeSwitcher)
