import React, { memo } from 'react'
import PropTypes from 'prop-types'

export const ModeSwitcher = ({
  icon,
  mode,
  title,
  switchMode,
}) => (
  <div className='auth-mode-switch-wrapper'>
    <div
      onClick={() => switchMode(mode)}
      className='bitfinex-auth-mode-switch'
    >
      {icon}
      {title}
    </div>
  </div>
)

ModeSwitcher.propTypes = {
  icon: PropTypes.node,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  switchMode: PropTypes.func.isRequired,
}

ModeSwitcher.defaultProps = {
  icon: null,
}

export default memo(ModeSwitcher)
