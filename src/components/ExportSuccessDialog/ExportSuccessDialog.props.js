import PropTypes from 'prop-types'

export const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  localExportPath: PropTypes.string,
}

export const defaultProps = {
  localExportPath: null,
}
