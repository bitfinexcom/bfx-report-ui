import PropTypes from 'prop-types'

const WALLETS_ENTRIES_PROPS = PropTypes.shape({
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  unsettledInterest: PropTypes.number,
  balanceAvailable: PropTypes.number,
})

export const propTypes = {
  currentTime: PropTypes.number,
  entries: PropTypes.arrayOf(WALLETS_ENTRIES_PROPS).isRequired,
  fetchWallets: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  timezone: PropTypes.string,
}

export const defaultProps = {
  currentTime: null,
  entries: [],
  fetchWallets: () => {},
  loading: true,
  refresh: () => {},
  timezone: '',
}
