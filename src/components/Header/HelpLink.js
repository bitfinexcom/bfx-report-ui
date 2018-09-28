import React, { PureComponent } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import {
  Button,
  Position,
  Tooltip,
} from '@blueprintjs/core'

class HelpLink extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  static handleHelp(e) {
    e.preventDefault()
    window.open('https://support.bitfinex.com/hc/en-us/articles/360008951853', '_blank')
  }

  render() {
    const { intl } = this.props
    return (
      <Tooltip
        content={(
          <span>
            {intl.formatMessage({ id: 'header.help' })}
          </span>
        )}
        position={Position.LEFT}
        usePortal={false}
      >
        <Button
          className='bitfinex-help'
          minimal
          icon='help'
          onClick={HelpLink.handleHelp}
        />
      </Tooltip>
    )
  }
}

export default injectIntl(HelpLink)
