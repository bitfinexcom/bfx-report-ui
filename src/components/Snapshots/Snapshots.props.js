import PropTypes from 'prop-types'

export const propTypes = {
  currentTime: PropTypes.number,
  positionsTotalPlUsd: PropTypes.number,
  positionsEntries: PropTypes.array.isRequired,
  positionsTickersEntries: PropTypes.array.isRequired,
  walletsTotalBalanceUsd: PropTypes.number,
  walletsTickersEntries: PropTypes.array.isRequired,
  walletsEntries: PropTypes.array.isRequired,
  fetchSnapshots: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  currentTime: null,
  positionsTotalPlUsd: null,
  positionsEntries: [],
  walletsTotalBalanceUsd: null,
  walletsEntries: [],
  fetchSnapshots: () => {},
  loading: true,
  refresh: () => {},
}
