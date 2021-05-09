import PropTypes from 'prop-types'

export const propTypes = {
  inputTimezone: PropTypes.string.isRequired,
  timeRange: PropTypes.shape({
    end: PropTypes.number,
    range: PropTypes.string.isRequired,
    start: PropTypes.number,
  }).isRequired,
  timezone: PropTypes.string.isRequired,
}
