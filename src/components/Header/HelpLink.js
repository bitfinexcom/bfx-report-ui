import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import {
  Button,
  Position,
  Tooltip,
} from '@blueprintjs/core'

class HelpLink extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  static handleHelp(e) {
    e.preventDefault()
    window.open('https://support.bitfinex.com/hc/en-us/articles/360008951853', '_blank')
  }

  render() {
    const { t } = this.props
    return (
      <Tooltip
        content={(
          <span>
            {t('header.help')}
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

export default withTranslation('translations')(HelpLink)
