import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Icon from 'icons'

export const ModeSwitcher = ({
  mode,
  title,
  switchMode,
}) => (
  <div className='auth-mode-switch-wrapper'>
    <div
      onClick={() => switchMode(mode)}
      className='bitfinex-auth-mode-switch'
    >
      <Icon.SIGN_IN />
      {title}
    </div>
  </div>
)

ModeSwitcher.propTypes = {
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  switchMode: PropTypes.func.isRequired,
}

export default memo(ModeSwitcher)
