import React from 'react'
import PropTypes from 'prop-types'
import './_LoadingPlaceholder.scss'

const LoadingPlaceholder = ({ color, size, width }) => {
  const placeholderStyle = {
    backgroundColor: color,
    width: `${width}px`,
    height: `${size}px`,
  }

  return <div className='loading-placeholder' style={placeholderStyle} />
}

LoadingPlaceholder.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf([22, 18, 14]),
  width: PropTypes.number,
}

LoadingPlaceholder.defaultProps = {
  color: '#2A3F4D',
  // color: '#334A59',
  size: 22,
  width: 80,
}

export default LoadingPlaceholder
