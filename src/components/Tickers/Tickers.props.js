import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const TICKERS_ENTRIES_PROPS = PropTypes.shape({
  ask: PropTypes.number,
  bid: PropTypes.number,
  mtsUpdate: PropTypes.number.isRequired,
  pair: PropTypes.string.isRequired,
})

export const propTypes = {
  addTargetPair: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(TICKERS_ENTRIES_PROPS).isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchTickers: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
  refresh: PropTypes.func.isRequired,
  removeTargetPair: PropTypes.func.isRequired,
  targetPairs: PropTypes.arrayOf(PropTypes.string),
  timezone: PropTypes.string,
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
  fetchTickers: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  pairs: [],
  refresh: () => {},
  removeTargetPair: () => {},
  targetPairs: '',
  nextPage: false,
}
