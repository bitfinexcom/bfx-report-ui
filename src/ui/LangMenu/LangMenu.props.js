import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  intl: intlShape.isRequired,
  setLang: PropTypes.func.isRequired,
}

export const defaultProps = {
  intl: {},
  setLang: () => {},
}
