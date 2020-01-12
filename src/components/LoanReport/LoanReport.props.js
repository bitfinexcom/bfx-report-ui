import PropTypes from 'prop-types'

const LOAN_REPORT_ENTRIES_PROPS = PropTypes.shape({
  mts: PropTypes.number.isRequired,
})

export const propTypes = {
  currentFetchParams: PropTypes.object.isRequired,
  entries: PropTypes.arrayOf(LOAN_REPORT_ENTRIES_PROPS).isRequired,
  targetSymbols: PropTypes.array.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  addTargetSymbol: PropTypes.func.isRequired,
  removeTargetSymbol: PropTypes.func.isRequired,
  setTargetSymbols: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
}

export const defaultProps = {
  entries: [],
}
