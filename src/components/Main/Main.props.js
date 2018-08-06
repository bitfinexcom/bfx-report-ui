import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  authIsShown: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool,
  intl: intlShape.isRequired,
  setTimeRange: PropTypes.func.isRequired,
}

export const defaultProps = {
  authIsShown: false,
  authStatus: false,
  intl: {},
  setTimeRange: () => {},
}
