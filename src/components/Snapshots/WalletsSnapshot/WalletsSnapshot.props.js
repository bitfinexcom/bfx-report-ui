import PropTypes from 'prop-types'

const WALLETS_ENTRIES_PROPS = PropTypes.shape({
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  unsettledInterest: PropTypes.number,
  balanceAvailable: PropTypes.number,
})

export const propTypes = {
  totalBalanceUsd: PropTypes.number,
  entries: PropTypes.arrayOf(WALLETS_ENTRIES_PROPS).isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  totalBalanceUsd: null,
  entries: [],
}
