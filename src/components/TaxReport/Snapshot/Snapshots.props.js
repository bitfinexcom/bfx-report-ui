import PropTypes from 'prop-types'

export const propTypes = {
  data: PropTypes.shape({
    positionsTotalPlUsd: PropTypes.number,
    positionsEntries: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    positionsTickersEntries: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    walletsTotalBalanceUsd: PropTypes.number,
    walletsTickersEntries: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    walletsEntries: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
