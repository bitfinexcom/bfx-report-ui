import PropTypes from 'prop-types'

const TICKERS_ENTRIES_PROPS = PropTypes.shape({
  ask: PropTypes.number,
  bid: PropTypes.number,
  mtsUpdate: PropTypes.number.isRequired,
  pair: PropTypes.string.isRequired,
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  addTargetPair: PropTypes.func.isRequired,
  setTargetPairs: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(TICKERS_ENTRIES_PROPS).isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchTickers: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  hasSyncPref: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
  refresh: PropTypes.func.isRequired,
  removeTargetPair: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetPairs: PropTypes.arrayOf(PropTypes.string),
  timeOffset: PropTypes.string.isRequired,
  updateErrorStatus: PropTypes.func.isRequired,
}

export const defaultProps = {
  existingPairs: [],
  hasSyncPref: false,
  pairs: [],
  refresh: () => {},
  updateErrorStatus: () => {},
}
