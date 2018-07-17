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
  entries: PropTypes.arrayOf(ORDERS_ENTRIES_PROPS).isRequired,
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
}

export const defaultProps = {
  entries: [],
  intl: {},
  loading: true,
}
