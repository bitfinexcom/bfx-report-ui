import PropTypes from 'prop-types'

export const propTypes = {
  authData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isPersisted: PropTypes.bool,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  updateAuth: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
  })).isRequired,
}

export const defaultProps = {}
