import PropTypes from 'prop-types'

const MOVEMENTS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  mtsStarted: PropTypes.number.isRequired,
  mtsUpdated: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  destinationAddress: PropTypes.string,
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  addTargetSymbol: PropTypes.func.isRequired,
  setTargetSymbols: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(MOVEMENTS_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchMovements: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetSymbol: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetSymbols: PropTypes.arrayOf(PropTypes.string),
  timeOffset: PropTypes.string.isRequired,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  addTargetSymbol: () => {},
  offset: 0,
  entries: [],
  existingCoins: [],
  fetchMovements: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  getFullTime: () => {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  removeTargetSymbol: () => {},
  targetSymbols: [],
  nextPage: false,
}
