import PropTypes from 'prop-types'

const PUBLIC_TRADES_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  mts: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  entries: PropTypes.arrayOf(PUBLIC_TRADES_ENTRIES_PROPS).isRequired,
  fetchData: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  setTargetPair: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetPair: PropTypes.string,
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {
  entries: [],
  targetPair: '',
}
