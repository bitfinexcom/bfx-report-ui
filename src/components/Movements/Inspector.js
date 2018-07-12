import React from 'react'
import PropTypes from 'prop-types'

const INSPECTORS = {
  ETH: {
    name: 'etherscan.io',
    url: 'https://etherscan.io/address/',
  },
}

export const Inspector = ({ currency, destinationAddress }) => {
  const target = INSPECTORS[currency]
  return target ? (
    <span className='bitfinex-show-soft'>
      (<a href={`${target.url}${destinationAddress}`} target='_blank' rel='noopener noreferrer'>{target.name}</a>)
    </span>
  ) : ''
}

Inspector.propTypes = {
  currency: PropTypes.string,
  destinationAddress: PropTypes.string,
}
Inspector.defaultProps = {
  currency: '',
  destinationAddress: '',
}

export default Inspector
