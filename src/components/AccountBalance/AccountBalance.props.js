import PropTypes from 'prop-types'

const BALANCE_ENTRIES_PROPS = PropTypes.shape({
  mts: PropTypes.number.isRequired,
})

export const propTypes = {
  currentFetchParams: PropTypes.object.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  entries: PropTypes.arrayOf(BALANCE_ENTRIES_PROPS).isRequired,
  fetchData: PropTypes.func.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  timeframe: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  entries: [],
  params: {},
}
