import PropTypes from 'prop-types'

const CANDLES_ENTRIES_PROPS = PropTypes.shape({
  time: PropTypes.number.isRequired,
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

export const CANDLES_PROPS = PropTypes.shape({
  entries: PropTypes.arrayOf(CANDLES_ENTRIES_PROPS).isRequired,
  isLoading: PropTypes.bool.isRequired,
  nextPage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
})

export const TRADES_PROPS = PropTypes.shape({
  entries: PropTypes.arrayOf(TRADES_ENTRIES_PROPS).isRequired,
  isLoading: PropTypes.bool.isRequired,
  nextPage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
})

export const propTypes = {
  candles: CANDLES_PROPS,
  dataReceived: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  trades: TRADES_PROPS,
}

export const defaultProps = {}
