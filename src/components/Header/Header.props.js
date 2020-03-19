import PropTypes from 'prop-types'

export const propTypes = {
  authIsShown: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool,
  email: PropTypes.string,
  logout: PropTypes.func.isRequired,
}

export const defaultProps = {
  authIsShown: false,
  authStatus: false,
}
