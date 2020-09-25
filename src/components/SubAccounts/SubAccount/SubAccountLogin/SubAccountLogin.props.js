import PropTypes from 'prop-types'

export const propTypes = {
  authData: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
}

export const defaultProps = {}
