import PropTypes from 'prop-types'

export const propTypes = {
  end: PropTypes.number,
  start: PropTypes.number,
  range: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  timezone: PropTypes.string.isRequired,
  onTimeFrameUpdate: PropTypes.func.isRequired,
}

export const defaultProps = {
  start: 0,
  end: 0,
}
