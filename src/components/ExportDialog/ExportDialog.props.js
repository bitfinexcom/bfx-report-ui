import PropTypes from 'prop-types'

export const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  email: PropTypes.string,
  toggleDialog: PropTypes.func.isRequired,
  exportCsv: PropTypes.func.isRequired,
  prepareExport: PropTypes.func.isRequired,
}

export const defaultProps = {
  start: 0,
  end: 0,
  email: '',
}
