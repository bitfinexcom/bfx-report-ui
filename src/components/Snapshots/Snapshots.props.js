import PropTypes from 'prop-types'

const POSITIONS_ENTRIES_PROPS = PropTypes.shape({
  amount: PropTypes.number,
  basePrice: PropTypes.number,
  liquidationPrice: PropTypes.number,
  marginFunding: PropTypes.number,
  marginFundingType: PropTypes.number,
  mtsUpdate: PropTypes.number,
  pair: PropTypes.string.isRequired,
  pl: PropTypes.number,
  plPerc: PropTypes.number,
})

const POSITIONS_TICKERS_ENTRIES_PROPS = PropTypes.shape({
  pair: PropTypes.string.isRequired,
  amount: PropTypes.number,
})

const WALLETS_TICKERS_ENTRIES_PROPS = PropTypes.shape({
  walletType: PropTypes.string.isRequired,
  pair: PropTypes.string.isRequired,
  amount: PropTypes.number,
})

const WALLETS_ENTRIES_PROPS = PropTypes.shape({
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  unsettledInterest: PropTypes.number,
  balanceAvailable: PropTypes.number,
})

export const propTypes = {
  currentTime: PropTypes.number,
  positionsEntries: PropTypes.arrayOf(POSITIONS_ENTRIES_PROPS).isRequired,
  positionsTickersEntries: PropTypes.arrayOf(POSITIONS_TICKERS_ENTRIES_PROPS).isRequired,
  walletsTickersEntries: PropTypes.arrayOf(WALLETS_TICKERS_ENTRIES_PROPS).isRequired,
  walletsEntries: PropTypes.arrayOf(WALLETS_ENTRIES_PROPS).isRequired,
  fetchSnapshots: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getFullTime: PropTypes.func,
  timeOffset: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  currentTime: null,
  positionsEntries: [],
  walletsEntries: [],
  fetchSnapshots: () => {},
  getFullTime: () => {},
  loading: true,
  refresh: () => {},
}
