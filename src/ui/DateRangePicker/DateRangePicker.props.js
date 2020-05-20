import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  controlledFromRedux: PropTypes.bool,
  end: PropTypes.number,
  range: PropTypes.string.isRequired,
  setTimeRange: PropTypes.func.isRequired,
  start: PropTypes.number,
  t: PropTypes.func.isRequired,
  toggleTimeFrameDialog: PropTypes.func.isRequired,
  updateSuccessStatus: PropTypes.func.isRequired,
}

export const defaultProps = {
  className: '',
  controlledFromRedux: false,
}
