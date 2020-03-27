import PropTypes from 'prop-types'

export const propTypes = {
  refresh: PropTypes.func.isRequired,
  symbolSelectorProps: {
    currentFilters: PropTypes.array,
    existingCoins: PropTypes.array,
    toggleSymbol: PropTypes.func.isRequired,
  }.isRequired,
  t: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export const defaultProps = {}
