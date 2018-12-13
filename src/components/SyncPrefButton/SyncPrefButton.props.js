import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  intl: intlShape.isRequired,
  logout: PropTypes.func.isRequired,
  syncPairs: PropTypes.arrayOf(String),
  startTime: PropTypes.number,
  setPairs: PropTypes.func.isRequired,
  textOnly: PropTypes.bool,
}

export const defaultProps = {
  logout: () => {},
  syncPairs: [],
  startTime: 0,
  setPairs: () => {},
  textOnly: false,
}
