import PropTypes from 'prop-types'

export const propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isNotProtected: PropTypes.bool,
    apiKey: PropTypes.string,
    apiSecret: PropTypes.string,
  })).isRequired,
  addMultipleAccsEnabled: PropTypes.bool.isRequired,
  masterAccount: PropTypes.string,
  authData: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
  })).isRequired,
}

export const defaultProps = {
  masterAccount: undefined,
}
