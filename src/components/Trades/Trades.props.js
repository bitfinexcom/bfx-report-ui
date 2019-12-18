import PropTypes from 'prop-types'

const TRADES_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  execAmount: PropTypes.number.isRequired,
  execPrice: PropTypes.number.isRequired,
  fee: PropTypes.number,
  feeCurrency: PropTypes.string,
  mtsCreate: PropTypes.number.isRequired,
  orderID: PropTypes.number.isRequired,
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  addTargetPair: PropTypes.func.isRequired,
  setTargetPairs: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(TRADES_ENTRIES_PROPS).isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchTrades: PropTypes.func.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetPair: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetPairs: PropTypes.arrayOf(PropTypes.string),
  getFullTime: PropTypes.func,
  timeOffset: PropTypes.string.isRequired,
  handleClickExport: PropTypes.func.isRequired,
}

export const defaultProps = {
  existingPairs: [],
  targetPairs: [],
}
