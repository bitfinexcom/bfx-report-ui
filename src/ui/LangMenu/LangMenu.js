import React, { PureComponent } from 'react'
import { withNamespaces } from 'react-i18next'
import {
  Button,
  Intent,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core'

import { propTypes, defaultProps } from './LangMenu.props'

class LangMenu extends PureComponent {
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
    const { locale, t } = this.props
    const options = (
      <Menu>
        <MenuItem
          text={t('header.lang.en')}
          onClick={this.switchEn}
          intent={locale === 'en' ? Intent.PRIMARY : undefined}
        />
        <MenuItem
          text={t('header.lang.tw')}
          onClick={this.switchTw}
          intent={locale === 'tw' ? Intent.PRIMARY : undefined}
        />
      </Menu>
    )
    return (
      <Popover
        content={options}
        interactionKind={PopoverInteractionKind.CLICK}
        position={Position.BOTTOM}
      >
        <Button
          rightIcon='caret-down'
          text={t(`header.lang.${locale}`)}
        />
      </Popover>
    )
  }
}

export default withNamespaces('translations')(LangMenu)
