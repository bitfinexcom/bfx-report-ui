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
