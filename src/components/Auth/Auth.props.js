import PropTypes from 'prop-types'

export const propTypes = {
  authStatus: PropTypes.bool,
  apiKey: PropTypes.string,
  apiSecret: PropTypes.string,
  checkAuth: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isShown: PropTypes.bool.isRequired,
  setKey: PropTypes.func.isRequired,
  setSecret: PropTypes.func.isRequired,
}

export const defaultProps = {
  authStatus: null,
  apiKey: '',
  apiSecret: '',
  checkAuth: () => {},
  intl: {},
  isShown: false,
  setKey: () => {},
  setSecret: () => {},
}
