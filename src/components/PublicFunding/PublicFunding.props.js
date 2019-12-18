import PropTypes from 'prop-types'

const PUBLIC_FUNDING_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  mts: PropTypes.number.isRequired,
  period: PropTypes.number.isRequired,
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  entries: PropTypes.arrayOf(PUBLIC_FUNDING_ENTRIES_PROPS).isRequired,
  fetchPublicfunding: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  hasSyncPref: PropTypes.bool.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  setTargetSymbol: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetSymbol: PropTypes.string,
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {
  entries: [],
  hasSyncPref: false,
  targetSymbol: '',
}
