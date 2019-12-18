import PropTypes from 'prop-types'

const FLOAN_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  side: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  status: PropTypes.string,
  rate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  period: PropTypes.number,
  mtsUpdate: PropTypes.number.isRequired,
  mtsOpening: PropTypes.number,
  mtsLastPayout: PropTypes.number,
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  addTargetSymbol: PropTypes.func.isRequired,
  setTargetSymbols: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(FLOAN_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchFloan: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetSymbol: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetSymbols: PropTypes.arrayOf(PropTypes.string),
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {
  entries: [],
  existingCoins: [],
  targetSymbols: [],
}
