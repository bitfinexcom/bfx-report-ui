import PropTypes from 'prop-types'

export const propTypes = {
  authStatus: PropTypes.bool,
  apiKey: PropTypes.string,
  apiSecret: PropTypes.string,
  checkAuth: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  setKey: PropTypes.func.isRequired,
  setSecret: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  authStatus: null,
  apiKey: '',
  apiSecret: '',
  checkAuth: () => {},
  isShown: false,
  loading: false,
  setKey: () => {},
  setSecret: () => {},
}

export const inputKeyPropTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export const inputKeyDefaultProps = {
  label: '',
  onChange: () => {},
  name: '',
  placeholder: '',
  value: '',
}
