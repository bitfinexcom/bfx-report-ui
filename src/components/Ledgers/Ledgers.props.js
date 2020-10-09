import PropTypes from 'prop-types'

export const LEDGERS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  mts: PropTypes.number.isRequired,
  wallet: PropTypes.string,
})

export const baseLedgersProps = {
  addTargetSymbol: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
  setTargetSymbols: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(LEDGERS_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchData: PropTypes.func.isRequired,
  getFullTime: PropTypes.func.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetSymbol: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetSymbols: PropTypes.arrayOf(PropTypes.string),
  timeOffset: PropTypes.string.isRequired,
}

export const propTypes = {
  ...baseLedgersProps,
  setParams: PropTypes.func.isRequired,
}

export const defaultProps = {
  existingCoins: [],
  targetSymbols: [],
}
