import PropTypes from 'prop-types'

const POSITIONS_TICKERS_ENTRIES_PROPS = PropTypes.shape({
  pair: PropTypes.string.isRequired,
  amount: PropTypes.number,
})

const WALLETS_TICKERS_ENTRIES_PROPS = PropTypes.shape({
  walletType: PropTypes.string.isRequired,
  pair: PropTypes.string.isRequired,
  amount: PropTypes.number,
})

export const propTypes = {
  positionsTickersEntries: PropTypes.arrayOf(POSITIONS_TICKERS_ENTRIES_PROPS).isRequired,
  walletsTickersEntries: PropTypes.arrayOf(WALLETS_TICKERS_ENTRIES_PROPS).isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  totalBalanceUsd: null,
  entries: [],
}
