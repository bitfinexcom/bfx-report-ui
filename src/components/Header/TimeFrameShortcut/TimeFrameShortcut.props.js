import PropTypes from 'prop-types'

export const propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setTimeRange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
