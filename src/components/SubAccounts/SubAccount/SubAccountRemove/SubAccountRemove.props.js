import PropTypes from 'prop-types'

export const propTypes = {
  authData: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  removeSubAccount: PropTypes.func.isRequired,
}

export const defaultProps = {}
