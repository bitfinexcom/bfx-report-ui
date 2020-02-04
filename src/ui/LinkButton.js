import React from 'react'
import PropTypes from 'prop-types'

export const LinkButton = (props) => {
  const {
    children,
    onClick,
  } = props

  /* eslint-disable */
  return (
    <a onClick={onClick}>
      {children}
    </a>
  )
}

LinkButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onClick: PropTypes.func.isRequired,
}

LinkButton.defaultProps = {}

export default LinkButton
