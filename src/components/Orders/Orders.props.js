import PropTypes from 'prop-types'

const ORDERS_ENTRIES_PROPS = PropTypes.shape({
  amountOrig: PropTypes.number,
  amountExecuted: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  mtsUpdate: PropTypes.number.isRequired,
  pair: PropTypes.string.isRequired,
  price: PropTypes.number,
  priceAvg: PropTypes.number,
  status: PropTypes.string,
  type: PropTypes.string.isRequired,
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  addTargetPair: PropTypes.func.isRequired,
  setTargetPairs: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(ORDERS_ENTRIES_PROPS).isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchOrders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetPair: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetPairs: PropTypes.arrayOf(PropTypes.string),
  getFullTime: PropTypes.func,
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {
  existingPairs: [],
  targetPairs: [],
}
