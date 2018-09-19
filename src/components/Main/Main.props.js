import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  authIsShown: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool,
  exportCsv: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  setTimeRange: PropTypes.func.isRequired,
}

export const defaultProps = {
  authIsShown: false,
  authStatus: false,
  intl: {},
}

export const customDialogPropTypes = {
  handleCustomDialogClose: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  isCustomOpen: PropTypes.bool.isRequired,
  menuMode: PropTypes.string,
  startQuery: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
}

export const customDialogDefaultProps = {
  menuMode: '',
}

export const ToggleMenuPropTypes = {
  handleClickCustom: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  menuMode: PropTypes.string,
  target: PropTypes.string.isRequired,
  MAPPING: PropTypes,
}

export const ToggleMenuDefaultProps = {
  menuMode: '',
}
