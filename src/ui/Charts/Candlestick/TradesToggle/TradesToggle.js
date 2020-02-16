import React from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import Tooltip from 'ui/Tooltip'

import { propTypes, defaultProps } from './TradesToggle.props'

class TradesToggle extends React.PureComponent {
  onChange = () => {
    const { value, onChange } = this.props
    onChange(!value)
  }

  render() {
    const { value, t } = this.props

    const classes = classNames('candlestick-trades-toggle', {
      'candlestick-trades-toggle--active': value,
    })

    return (
      <div className={classes}>
        <Tooltip content={t('candles.toggle_trades')}>
          <Icon
            className='candlestick-trades-toggle-icon'
            icon={IconNames.EYE_OPEN}
            onClick={this.onChange}
          />
        </Tooltip>
      </div>
    )
  }
}

TradesToggle.propTypes = propTypes
TradesToggle.defaultProps = defaultProps

export default withTranslation('translations')(TradesToggle)
