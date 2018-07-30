import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const ORDERS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  pair: PropTypes.string.isRequired,
  mtsUpdate: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  priceAvg: PropTypes.number.isRequired,
})

export const propTypes = {
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(ORDERS_ENTRIES_PROPS).isRequired,
  fetchOrders: PropTypes.func.isRequired,
  fetchNextOrders: PropTypes.func.isRequired,
  fetchPrevOrders: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
}

export const defaultProps = {
  offset: 0,
  entries: [],
  fetchOrders: () => {},
  fetchNextOrders: () => {},
  fetchPrevOrders: () => {},
  intl: {},
  loading: true,
}
