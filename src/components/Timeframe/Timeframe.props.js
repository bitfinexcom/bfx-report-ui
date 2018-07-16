import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  intl: intlShape.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
}

export const defaultProps = {
  intl: {},
  start: 0,
  end: 0,
}
