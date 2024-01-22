import React from 'react'
import PropTypes from 'prop-types'

const LoadingPlaceholder = ({ color, size, baseWidth }) => {
  const randomWidth = Math.floor(Math.random() * 21) + baseWidth - 10
  const placeholderStyle = {
    backgroundColor: color,
    width: `${randomWidth}px`,
    height: `${size}px`,
  }

  return <div className='loading-placeholder' style={placeholderStyle} />
}

LoadingPlaceholder.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf([22, 18, 14]),
  baseWidth: PropTypes.number,
}

LoadingPlaceholder.defaultProps = {
  // color: '#2A3F4D',
  // color: '#334A59',
  size: 22,
  baseWidth: 80,
}

export default LoadingPlaceholder
