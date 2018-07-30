import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const TRADES_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  mtsCreate: PropTypes.number.isRequired,
  execAmount: PropTypes.number.isRequired,
  execPrice: PropTypes.number.isRequired,
  fee: PropTypes.number,
  feeCurrency: PropTypes.string,
})

export const propTypes = {
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(TRADES_ENTRIES_PROPS).isRequired,
  fetchTrades: PropTypes.func.isRequired,
  fetchNextTrades: PropTypes.func.isRequired,
  fetchPrevTrades: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
}

export const defaultProps = {
  offset: 0,
  entries: [],
  fetchTrades: () => {},
  fetchNextTrades: () => {},
  fetchPrevTrades: () => {},
  intl: {},
  loading: true,
}
