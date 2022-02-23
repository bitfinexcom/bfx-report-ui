import React, { memo } from 'react'
import PropTypes from 'prop-types'

export const Explorer = ({
  currency,
  explorers,
  destinationAddress,
}) => {
  if (!explorers[currency]) {
    return null
  }
  const [name, link] = explorers[currency]
  return name && link ? (
    <span className='bitfinex-show-soft'>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={link.replace('VAL', destinationAddress)}
      >
        {name}
      </a>
    </span>
  ) : null
}

Explorer.propTypes = {
  currency: PropTypes.string,
  destinationAddress: PropTypes.string,
  explorers: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
}

Explorer.defaultProps = {
  currency: '',
  explorers: {},
  destinationAddress: '',
}

export default memo(Explorer)
