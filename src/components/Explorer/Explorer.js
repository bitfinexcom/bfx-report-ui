import React from 'react'

import { propTypes, defaultProps } from './Explorer.props'

export const Explorer = ({ currency, destinationAddress, explorers = {} }) => {
  if (!explorers[currency]) {
    return null
  }
  const [name, link] = explorers[currency]
  return name && link ? (
    <span className='bitfinex-show-soft'>
      <a href={link.replace('VAL', destinationAddress)} target='_blank' rel='noopener noreferrer'>
        {name}
      </a>
    </span>
  ) : null
}

Explorer.propTypes = propTypes
Explorer.defaultProps = defaultProps

export default Explorer
