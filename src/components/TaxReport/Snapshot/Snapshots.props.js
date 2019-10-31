import PropTypes from 'prop-types'

export const propTypes = {
  data: PropTypes.shape({
    positionsTotalPlUsd: PropTypes.number,
    positionsEntries: PropTypes.array.isRequired,
    positionsTickersEntries: PropTypes.array.isRequired,
    walletsTotalBalanceUsd: PropTypes.number,
    walletsTickersEntries: PropTypes.array.isRequired,
    walletsEntries: PropTypes.array.isRequired,
  }).isRequired,
  fetchSnapshot: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
