import PropTypes from 'prop-types'

export const propTypes = {
  authIsShown: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  menuMode: PropTypes.string,
  setMenuMode: PropTypes.func.isRequired,
  showCustomDialog: PropTypes.func,
}

export const defaultProps = {
  authIsShown: false,
  authStatus: false,
  logout: () => {},
  menuMode: '',
  showCustomDialog: () => {},
}
