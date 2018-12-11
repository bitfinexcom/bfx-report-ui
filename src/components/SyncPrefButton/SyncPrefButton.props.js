import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  intl: intlShape.isRequired,
  syncPairs: PropTypes.arrayOf(String),
  startTime: PropTypes.instanceOf(Date),
  setPairs: PropTypes.func.isRequired,
  textOnly: PropTypes.bool,
}

export const defaultProps = {
  syncPairs: [],
  startTime: undefined,
  setPairs: () => {},
  textOnly: false,
}
