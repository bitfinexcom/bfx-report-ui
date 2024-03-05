import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const LoadingPlaceholder = ({ height, baseWidth, isStrong }) => {
  const offset = Math.random() > 0.5 ? 10 : -10
  const classes = classNames('loading-placeholder', { strong: isStrong })
  const placeholderSize = { height: `${height}px`, width: `${(baseWidth + offset)}px` }

  return <div className={classes} style={placeholderSize} />
}

LoadingPlaceholder.propTypes = {
  height: PropTypes.number,
  isStrong: PropTypes.bool,
  baseWidth: PropTypes.number,
}

LoadingPlaceholder.defaultProps = {
  height: 14,
  baseWidth: 72,
  isStrong: false,
}

export default memo(LoadingPlaceholder)
