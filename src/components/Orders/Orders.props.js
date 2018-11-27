import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const ORDERS_ENTRIES_PROPS = PropTypes.shape({
  amountOrig: PropTypes.number,
  amountExecuted: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  mtsUpdate: PropTypes.number.isRequired,
  pair: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  priceAvg: PropTypes.number,
  status: PropTypes.string,
  type: PropTypes.string.isRequired,
})

export const propTypes = {
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(ORDERS_ENTRIES_PROPS).isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchOrders: PropTypes.func.isRequired,
  fetchNextOrders: PropTypes.func.isRequired,
  fetchPrevOrders: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
  refresh: PropTypes.func.isRequired,
  setTargetPair: PropTypes.func.isRequired,
  targetPair: PropTypes.string,
  timezone: PropTypes.string,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  offset: 0,
  entries: [],
  existingPairs: [],
  fetchOrders: () => {},
  fetchNextOrders: () => {},
  fetchPrevOrders: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  pairs: [],
  refresh: () => {},
  setTargetPair: () => {},
  targetPair: '',
  nextPage: false,
}
