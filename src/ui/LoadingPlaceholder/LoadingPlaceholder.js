import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const LoadingPlaceholder = ({ height, baseWidth, isStrong }) => {
  const randomWidth = Math.floor(Math.random() * 21) + baseWidth - 10
  const placeholderSize = { height: `${height}px`, width: `${randomWidth}px` }
  const classes = classNames('loading-placeholder', { strong: isStrong })

  return <div className={classes} style={placeholderSize} />
}

LoadingPlaceholder.propTypes = {
  height: PropTypes.number,
  isStrong: PropTypes.bool,
  baseWidth: PropTypes.number,
}

LoadingPlaceholder.defaultProps = {
  // color: '#2A3F4D',
  // color: '#334A59',
  height: 22,
  baseWidth: 80,
  isStrong: false,
}

export default LoadingPlaceholder
