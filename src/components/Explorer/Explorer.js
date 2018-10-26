import React from 'react'

import { propTypes, defaultProps } from './Explorer.props'

export const Explorer = ({ currency, destinationAddress, explorers }) => {
  const target = explorers[currency]
  return target ? (
    <span className='bitfinex-show-soft'>
      <a href={target[1].replace('VAL', destinationAddress)} target='_blank' rel='noopener noreferrer'>
        {target[0]}
      </a>
    </span>
  ) : null
}

Explorer.propTypes = propTypes
Explorer.defaultProps = defaultProps

export default Explorer
