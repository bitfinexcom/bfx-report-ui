import React, { PureComponent } from 'react'
import {
  Button,
  Intent,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core'
import _keys from 'lodash/keys'

import { LANGUAGE_NAMES } from 'locales/i18n'

import { propTypes, defaultProps } from './LangMenu.props'

class LangMenu extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  switchLang(lang, e) {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.setLang(lang)
  }

  render() {
    const { locale } = this.props
    const options = (
      <Menu>
        {_keys(LANGUAGE_NAMES).map(language => (
          <MenuItem
            text={LANGUAGE_NAMES[language]}
            onClick={e => this.switchLang(language, e)}
            intent={locale === language ? Intent.PRIMARY : undefined}
          />
        ))}
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
          text={LANGUAGE_NAMES[locale]}
        />
      </Popover>
    )
  }
}

export default LangMenu
