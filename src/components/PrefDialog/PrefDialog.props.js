import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  intl: intlShape.isRequired,
  setTheme: PropTypes.func.isRequired,
  setTimeZone: PropTypes.func.isRequired,
  theme: PropTypes.string,
  timezone: PropTypes.string,
}

export const defaultProps = {
  intl: {},
}
