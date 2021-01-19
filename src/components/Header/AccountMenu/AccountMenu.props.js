import PropTypes from 'prop-types'

export const propTypes = {
  authStatus: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  toggleExportDialog: PropTypes.func.isRequired,
  togglePrefDialog: PropTypes.func.isRequired,
}

export const defaultProps = {}
