import PropTypes from 'prop-types'

export const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  end: PropTypes.number,
  start: PropTypes.number,
  t: PropTypes.func.isRequired,
  timeRange: PropTypes.shape({
    end: PropTypes.number,
    range: PropTypes.string.isRequired,
    start: PropTypes.number,
  }).isRequired,
  setTimeRange: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}

export const defaultProps = {
  start: 0,
  end: 0,
}
