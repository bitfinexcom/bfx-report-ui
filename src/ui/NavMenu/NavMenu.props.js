import PropTypes from 'prop-types'

export const propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  t: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}

export const defaultProps = {
}
