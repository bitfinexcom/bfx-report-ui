import PropTypes from 'prop-types'

const CANDLES_ENTRIES_PROPS = PropTypes.shape({
  mts: PropTypes.number.isRequired,
  open: PropTypes.number.isRequired,
  close: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
  low: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
})

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
  setParams: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(CANDLES_ENTRIES_PROPS).isRequired,
  tradesEntries: PropTypes.arrayOf(TRADES_ENTRIES_PROPS).isRequired,
  fetchData: PropTypes.func.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {}
