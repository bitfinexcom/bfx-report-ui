import React from 'react'

import { THEME_CLASSES } from 'utils/themes'

import darkLogo from './files/logo-dark-theme.svg'
import lightLogo from './files/logo-light-theme.svg'
import { propTypes, defaultProps } from './PlatformLogo.props'

const getLogo = (theme) => {
  switch (theme) {
    case THEME_CLASSES.DARK:
      return darkLogo
    case THEME_CLASSES.LIGHT:
      return lightLogo
    default:
      return null
  }
}

const PlatformLogo = ({ theme }) => {
  const logo = getLogo(theme)

  if (!logo) {
    return null
  }

  return (
    <img
      alt='Bitfinex'
      src={logo}
      className='platform-logo'
    />
  )
}

PlatformLogo.propTypes = propTypes
PlatformLogo.defaultProps = defaultProps

export default PlatformLogo
