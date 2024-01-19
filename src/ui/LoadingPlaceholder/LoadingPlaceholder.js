import React from 'react'
import PropTypes from 'prop-types'

const LoadingPlaceholder = ({ color, size, width }) => {
  // const randomWidth = Math.floor(Math.random() * 21) + width - 10;

  const placeholderStyle = {
    backgroundColor: color,
    width: `${width}px`,
    height: `${size}px`,
    animation: 'shimmer 1s infinite',
  }

  return <div style={placeholderStyle} />
}

LoadingPlaceholder.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf([22, 18, 14]),
  width: PropTypes.number,
}

LoadingPlaceholder.defaultProps = {
  color: '#2A3F4D',
  size: 22,
  width: 80,
}

export default LoadingPlaceholder
