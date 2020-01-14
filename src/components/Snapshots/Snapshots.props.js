import PropTypes from 'prop-types'

export const propTypes = {
  currentTime: PropTypes.number,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  positionsTotalPlUsd: PropTypes.number,
  positionsEntries: PropTypes.array.isRequired,
  positionsTickersEntries: PropTypes.array.isRequired,
  walletsTotalBalanceUsd: PropTypes.number,
  walletsTickersEntries: PropTypes.array.isRequired,
  walletsEntries: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  currentTime: null,
  positionsTotalPlUsd: null,
  positionsEntries: [],
  walletsTotalBalanceUsd: null,
  walletsEntries: [],
}
