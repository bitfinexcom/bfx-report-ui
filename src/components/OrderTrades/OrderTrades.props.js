import PropTypes from 'prop-types'

const ORDER_TRADES_ENTRIES_PROPS = PropTypes.shape({
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
  entries: PropTypes.arrayOf(ORDER_TRADES_ENTRIES_PROPS).isRequired,
  fetchData: PropTypes.func.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    targetPair: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {}
