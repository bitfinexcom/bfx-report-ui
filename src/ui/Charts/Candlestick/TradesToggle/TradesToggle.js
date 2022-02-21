import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import Tooltip from 'ui/Tooltip'

const TradesToggle = ({ value, onChange, t }) => {
  const onToggleChange = () => {
    onChange(!value)
  }

  const classes = classNames('candlestick-trades-toggle', {
    'candlestick-trades-toggle--active': value,
  })

  return (
    <div className={classes}>
      <Tooltip content={t('candles.toggle_trades')}>
        <Icon
          onClick={onToggleChange}
          icon={IconNames.EYE_OPEN}
          className='candlestick-trades-toggle-icon'
        />
      </Tooltip>
    </div>
  )
}

TradesToggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(memo(TradesToggle))
