import PropTypes from 'prop-types'

export const propTypes = {
  history: PropTypes.object.isRequired,
  refresh: PropTypes.func,
  t: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}

export const defaultProps = {}
