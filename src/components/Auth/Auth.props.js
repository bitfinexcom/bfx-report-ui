import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  authStatus: PropTypes.bool,
  apiKey: PropTypes.string,
  apiSecret: PropTypes.string,
  checkAuth: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
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

export const inputKeyPropTypes = {
  intl: intlShape.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
}

export const inputKeyDefaultProps = {
  intl: {},
  label: '',
  onChange: () => {},
  name: '',
  placeholder: '',
  value: '',
}
