import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  coins: PropTypes.arrayOf(PropTypes.string),
  currencies: PropTypes.objectOf(PropTypes.string),
  currentFilters: PropTypes.arrayOf(PropTypes.string),
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  inactiveCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleSymbol: PropTypes.func.isRequired,
}

export const defaultProps = {
  coins: [],
  className: '',
  currencies: {},
  currentFilters: [],
  existingCoins: [],
}
