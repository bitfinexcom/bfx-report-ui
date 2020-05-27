import PropTypes from 'prop-types'

export const propTypes = {
  authData: PropTypes.shape({
    apiKey: PropTypes.string,
    apiSecret: PropTypes.string,
    isPersisted: PropTypes.bool.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
  updateAuth: PropTypes.func.isRequired,
}

export const defaultProps = {}
