import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const PUBLIC_TRADES_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  mts: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

export const propTypes = {
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(PUBLIC_TRADES_ENTRIES_PROPS).isRequired,
  fetchPublictrades: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  hasSyncPref: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
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
  fetchPublictrades: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  hasSyncPref: false,
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  setTargetPair: () => {},
  targetPair: '',
  nextPage: false,
}
