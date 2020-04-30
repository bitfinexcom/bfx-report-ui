import PropTypes from 'prop-types'

export const propTypes = {
  end: PropTypes.number,
  range: PropTypes.string.isRequired,
  setTimeRange: PropTypes.func.isRequired,
  start: PropTypes.number,
  t: PropTypes.func.isRequired,
  updateSuccessStatus: PropTypes.func.isRequired,
}

export const defaultProps = {}
