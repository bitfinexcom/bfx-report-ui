import PropTypes from 'prop-types'

export const propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
  currencies: PropTypes.objectOf(PropTypes.string),
  currentFilters: PropTypes.arrayOf(PropTypes.string),
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  toggleSymbol: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  coins: [],
  currencies: {},
  currentFilters: [],
  existingCoins: [],
}
