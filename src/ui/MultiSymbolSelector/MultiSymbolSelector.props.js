import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
  currencies: PropTypes.objectOf(PropTypes.string),
  currentFilters: PropTypes.arrayOf(PropTypes.string),
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  handleTagRemove: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onSymbolSelect: PropTypes.func.isRequired,
  type: PropTypes.string,
}

export const defaultProps = {
  coins: [],
  currencies: {},
  currentFilters: [],
  existingCoins: [],
  type: '',
}
