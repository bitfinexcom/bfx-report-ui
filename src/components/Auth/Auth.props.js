import PropTypes from 'prop-types'

export const propTypes = {
  authData: PropTypes.shape({
    isNotFirstAuth: PropTypes.bool.isRequired,
  }).isRequired,
  isShown: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
