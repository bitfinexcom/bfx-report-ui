import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const ORDERS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  pair: PropTypes.string.isRequired,
  mtsUpdate: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  priceAvg: PropTypes.number.isRequired,
  timezone: PropTypes.string,
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
  targetPair: PropTypes.string,
  setTargetPair: PropTypes.func.isRequired,
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
}
