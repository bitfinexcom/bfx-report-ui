import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const WALLETS_ENTRIES_PROPS = PropTypes.shape({
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  unsettledInterest: PropTypes.number,
  balanceAvailable: PropTypes.number,
})

export const propTypes = {
  entries: PropTypes.arrayOf(WALLETS_ENTRIES_PROPS).isRequired,
  debouncedFetchWallets: PropTypes.func.isRequired,
  fetchWallets: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
}

export const defaultProps = {
  entries: [],
  debouncedFetchWallets: () => {},
  fetchWallets: () => {},
  intl: {},
  loading: true,
  refresh: () => {},
}
