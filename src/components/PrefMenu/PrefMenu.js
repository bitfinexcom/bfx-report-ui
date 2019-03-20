import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core'

import { LANGUAGES } from 'locales/i18n'

import { propTypes, defaultProps } from './PrefMenu.props'

class PrefMenu extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.switchEn = this.switchLang.bind(this, LANGUAGES.en)
    this.switchTw = this.switchLang.bind(this, LANGUAGES.tw)
  }

  switchLang(lang, e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setLang(lang)
  }

  render() {
    const {
      isLogin, handleClickPref, handleLogout, t,
    } = this.props
    const langContent = (
      <Menu>
        <MenuItem
          text={t('header.preferences')}
          onClick={handleClickPref}
        />
        <MenuDivider />
        <MenuItem
          text={t('header.logout')}
          onClick={handleLogout}
          disabled={!isLogin}
        />
      </Menu>
    )
    return (
      <Popover
        content={langContent}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.BOTTOM_RIGHT}
      >
        <Button
          minimal
          icon='person'
        />
      </Popover>
    )
  }
}

export default withTranslation('translations')(PrefMenu)
