import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  ButtonGroup,
  Intent,
} from '@blueprintjs/core'

import { platform } from 'var/config'

import { propTypes, defaultProps } from './ThemeSwitcher.props'

class ThemeSwitcher extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  switchTheme = (theme) => {
    const { setTheme } = this.props
    setTheme(theme)
  }

  render() {
    const { theme, t } = this.props

    if (platform.hideSwitchTheme) {
      return null
    }

    return (
      <ButtonGroup className='preferences-row preferences-theme'>
        <Button
          name='light'
          text={t('theme.light')}
          onClick={() => this.switchTheme('theme-light')}
          intent={theme.includes('light') ? Intent.PRIMARY : undefined}
        />
        <Button
          name='dark'
          text={t('theme.dark')}
          onClick={() => this.switchTheme('theme-dark')}
          intent={theme.includes('dark') ? Intent.PRIMARY : undefined}
        />
      </ButtonGroup>
    )
  }
}

export default withTranslation('translations')(ThemeSwitcher)
