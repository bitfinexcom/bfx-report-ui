import PropTypes from 'prop-types'

export const propTypes = {
  filter: PropTypes.bool,
  pairSelectorProps: PropTypes.shape({
    currentPair: PropTypes.string.isRequired,
    onPairSelect: PropTypes.func.isRequired,
  }),
  pairsSelectorProps: PropTypes.shape({
    currentFilters: PropTypes.array.isRequired,
    existingPairs: PropTypes.array.isRequired,
    togglePair: PropTypes.func.isRequired,
  }),
  refresh: PropTypes.func,
  symbolSelectorProps: PropTypes.shape({
    coins: PropTypes.array.isRequired,
    currencies: PropTypes.object.isRequired,
    currentCoin: PropTypes.string.isRequired,
    onSymbolSelect: PropTypes.func.isRequired,
  }),
  symbolsSelectorProps: PropTypes.shape({
    currentFilters: PropTypes.array.isRequired,
    existingCoins: PropTypes.array.isRequired,
    toggleSymbol: PropTypes.func.isRequired,
  }),
  t: PropTypes.func.isRequired,
  target: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export const defaultProps = {
  filter: true,
}
