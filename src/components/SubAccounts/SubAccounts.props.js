import PropTypes from 'prop-types'

export const propTypes = {
  authData: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    subUsers: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
    })),
  })).isRequired,
}

export const defaultProps = {}
