import PropTypes from 'prop-types'

export const propTypes = {
  handleExportDialogClose: PropTypes.func.isRequired,
  isExportOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  startExport: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  email: PropTypes.string,
}

export const defaultProps = {
  start: 0,
  end: 0,
  email: '',
}
