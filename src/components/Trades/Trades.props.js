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
  addTargetPair: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(TRADES_ENTRIES_PROPS).isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchTrades: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  getQueryLimit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetPair: PropTypes.func.isRequired,
  targetPairs: PropTypes.arrayOf(PropTypes.string),
  getFullTime: PropTypes.func,
  timeOffset: PropTypes.string.isRequired,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  addTargetPair: () => {},
  offset: 0,
  entries: [],
  existingPairs: [],
  fetchTrades: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  getFullTime: () => {},
  getQueryLimit: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  removeTargetPair: () => {},
  targetPairs: [],
  nextPage: false,
}
