import PropTypes from 'prop-types'

const DERIVATIVES_ENTRIES_PROPS = PropTypes.shape({
  pair: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  priceSpot: PropTypes.number.isRequired,
  fundBal: PropTypes.number.isRequired,
  fundingAccrued: PropTypes.number.isRequired,
  fundingStep: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  addTargetPair: PropTypes.func.isRequired,
  setTargetPairs: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(DERIVATIVES_ENTRIES_PROPS).isRequired,
  inactivePairs: PropTypes.arrayOf(PropTypes.string),
  pairs: PropTypes.arrayOf(PropTypes.string),
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchData: PropTypes.func.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetPair: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetPairs: PropTypes.arrayOf(PropTypes.string),
  getFullTime: PropTypes.func,
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {
  entries: [],
  existingPairs: [],
  targetPairs: [],
}
