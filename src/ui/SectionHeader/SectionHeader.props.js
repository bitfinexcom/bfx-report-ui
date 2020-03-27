import PropTypes from 'prop-types'

export const propTypes = {
  refresh: PropTypes.func.isRequired,
  symbolSelectorProps: PropTypes.shape({
    currentFilters: PropTypes.array.isRequired,
    existingCoins: PropTypes.array.isRequired,
    toggleSymbol: PropTypes.func.isRequired,
  }),
  pairSelectorProps: PropTypes.shape({
    currentFilters: PropTypes.array.isRequired,
    existingPairs: PropTypes.array.isRequired,
    togglePair: PropTypes.func.isRequired,
  }),
  t: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export const defaultProps = {}
