import PropTypes from 'prop-types'

const LOAN_REPORT_ENTRIES_PROPS = PropTypes.shape({
  mts: PropTypes.number.isRequired,
})

export const propTypes = {
  currentFetchParams: PropTypes.object.isRequired,
  entries: PropTypes.arrayOf(LOAN_REPORT_ENTRIES_PROPS).isRequired,
  targetPairs: PropTypes.array.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  addTargetPair: PropTypes.func.isRequired,
  setTargetPairs: PropTypes.func.isRequired,
  removeTargetPair: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
}

export const defaultProps = {
  entries: [],
}
