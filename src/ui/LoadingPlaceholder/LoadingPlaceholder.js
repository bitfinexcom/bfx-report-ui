import React from 'react'
import PropTypes from 'prop-types'

const LoadingPlaceholder = ({ height, baseWidth }) => {
  const randomWidth = Math.floor(Math.random() * 21) + baseWidth - 10
  const placeholderStyle = { height: `${height}px`, width: `${randomWidth}px` }

  return <div className='loading-placeholder' style={placeholderStyle} />
}

LoadingPlaceholder.propTypes = {
  height: PropTypes.number,
  baseWidth: PropTypes.number,
}

LoadingPlaceholder.defaultProps = {
  // color: '#2A3F4D',
  // color: '#334A59',
  height: 22,
  baseWidth: 80,
}

export default LoadingPlaceholder
