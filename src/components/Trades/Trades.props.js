import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

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
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(TRADES_ENTRIES_PROPS).isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchTrades: PropTypes.func.isRequired,
  fetchNextTrades: PropTypes.func.isRequired,
  fetchPrevTrades: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  setTargetPair: PropTypes.func.isRequired,
  targetPair: PropTypes.string,
  timezone: PropTypes.string,
}

export const defaultProps = {
  offset: 0,
  entries: [],
  existingPairs: [],
  fetchTrades: () => {},
  fetchNextTrades: () => {},
  fetchPrevTrades: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  setTargetPair: () => {},
  targetPair: '',
}
