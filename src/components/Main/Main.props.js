import PropTypes from 'prop-types'

export const propTypes = {
  authIsShown: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool,
  exportCsv: PropTypes.func.isRequired,
  isCustomOpen: PropTypes.bool,
  setTimeRange: PropTypes.func,
  showCustomDialog: PropTypes.func,
}

export const defaultProps = {
  authIsShown: false,
  authStatus: false,
}

export const customDialogPropTypes = {
  endDate: PropTypes.instanceOf(Date),
  handleCustomDialogClose: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  isCustomOpen: PropTypes.bool.isRequired,
  menuMode: PropTypes.string,
  startQuery: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  t: PropTypes.func.isRequired,
}

export const customDialogDefaultProps = {
  menuMode: '',
}
