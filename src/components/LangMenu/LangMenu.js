import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Menu,
  MenuItem,
  Popover,
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
    const { intl, locale } = this.props
    const langContent = (
      <Menu>
        <MenuItem
          text={intl.formatMessage({ id: 'header.lang.en' })}
          onClick={this.switchEn}
        />
        <MenuItem
          text={intl.formatMessage({ id: 'header.lang.tw' })}
          onClick={this.switchTw}
        />
      </Menu>
    )
    return (
      <Popover content={langContent}>
        <Button
          minimal
          rightIcon='caret-down'
          text={intl.formatMessage({ id: `header.lang.${locale}` })}
        />
      </Popover>
    )
  }
}

export default injectIntl(LangMenu)
