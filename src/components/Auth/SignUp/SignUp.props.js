import PropTypes from 'prop-types'

export const propTypes = {
  authType: PropTypes.string.isRequired,
  authData: PropTypes.shape({
    apiKey: PropTypes.string,
    apiSecret: PropTypes.string,
    isPersisted: PropTypes.bool.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
  switchAuthType: PropTypes.func.isRequired,
  updateAuth: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
  })).isRequired,
}

export const defaultProps = {}
