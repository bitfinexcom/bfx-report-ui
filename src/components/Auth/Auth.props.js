import PropTypes from 'prop-types'

export const propTypes = {
  authData: PropTypes.shape({
    hasAuthData: PropTypes.bool.isRequired,
  }).isRequired,
  isShown: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  usersLoading: PropTypes.bool.isRequired,
}

export const defaultProps = {}
