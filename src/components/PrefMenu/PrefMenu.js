import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core'

import { propTypes, defaultProps } from './PrefMenu.props'

class PrefMenu extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)
    this.switchEn = this.switchLang.bind(this, 'en')
    this.switchTw = this.switchLang.bind(this, 'tw')
  }

  switchLang(lang, e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setLang(lang)
  }

  render() {
    const {
      intl, isLogin, handleClickPref, handleLogout,
    } = this.props
    const langContent = (
      <Menu>
        <MenuItem
          text={intl.formatMessage({ id: 'header.preferences' })}
          onClick={handleClickPref}
        />
        <MenuDivider />
        <MenuItem
          text={intl.formatMessage({ id: 'header.logout' })}
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

export default injectIntl(PrefMenu)
