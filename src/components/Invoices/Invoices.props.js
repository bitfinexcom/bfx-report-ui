import PropTypes from 'prop-types'

export const INVOICES_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  payCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
  customerInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
  payment: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  duration: PropTypes.number.isRequired,
  merchantName: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  mts: PropTypes.number.isRequired,
  webhook: PropTypes.string.isRequired,
})

export const propTypes = {
  addTargetSymbol: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired,
  setTargetSymbols: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(INVOICES_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchData: PropTypes.func.isRequired,
  getFullTime: PropTypes.func.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetSymbol: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetSymbols: PropTypes.arrayOf(PropTypes.string),
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {
  existingCoins: [],
  targetSymbols: [],
}
