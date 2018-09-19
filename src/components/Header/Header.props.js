import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  authIsShown: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool,
  intl: intlShape.isRequired,
  logout: PropTypes.func.isRequired,
  menuMode: PropTypes.string,
  setMenuMode: PropTypes.func.isRequired,
}

export const defaultProps = {
  authIsShown: false,
  authStatus: false,
  intl: {},
  logout: () => {},
  menuMode: '',
}
