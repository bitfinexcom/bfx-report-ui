import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  entries: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
}

export const defaultProps = {
  entries: [],
  intl: {},
}
