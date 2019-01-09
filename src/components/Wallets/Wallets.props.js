import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

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
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  setTimestamp: PropTypes.func.isRequired,
}

export const defaultProps = {
  currentTime: 0,
  entries: [],
  fetchWallets: () => {},
  intl: {},
  loading: true,
  refresh: () => {},
  setTimestamp: () => {},
}
