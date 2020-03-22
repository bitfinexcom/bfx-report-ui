import PropTypes from 'prop-types'

export const propTypes = {
  authIsShown: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool,
}

export const defaultProps = {
  authIsShown: false,
  authStatus: false,
}
