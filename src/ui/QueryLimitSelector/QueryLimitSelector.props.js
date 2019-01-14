import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  getQueryLimit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  setQueryLimit: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}

export const defaultProps = {
  getQueryLimit: () => {},
  setQueryLimit: () => {},
  target: '',
}
