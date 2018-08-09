import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  handleExportDialogClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  isExportOpen: PropTypes.bool.isRequired,
  startExport: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
}

export const defaultProps = {
  start: 0,
  end: 0,
}
