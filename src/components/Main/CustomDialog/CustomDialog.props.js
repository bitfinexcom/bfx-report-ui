import PropTypes from 'prop-types'

export const propTypes = {
  handleCustomDialogClose: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isCustomOpen: PropTypes.bool.isRequired,
  startQuery: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  updateWarningStatus: PropTypes.func.isRequired,
}

export const defaultProps = {
  startDate: null,
  endDate: null,
}
