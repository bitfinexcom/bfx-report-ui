/* eslint-disable import/prefer-default-export */
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

const MOVEMENTS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  mtsStarted: PropTypes.number.isRequired,
  mtsUpdated: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  destinationAddress: PropTypes.string,
})

export const propTypes = {
  data: PropTypes.shape({
    startingPositionsSnapshot: PropTypes.arrayOf(POSITIONS_ENTRIES_PROPS).isRequired,
    endingPositionsSnapshot: PropTypes.arrayOf(POSITIONS_ENTRIES_PROPS).isRequired,
    finalState: PropTypes.shape({
      startingPeriodBalances: PropTypes.shape({
        walletsTotalBalanceUsd: PropTypes.number,
        positionsTotalPlUsd: PropTypes.number,
        totalResult: PropTypes.number,
      }),
      movements: PropTypes.arrayOf(MOVEMENTS_ENTRIES_PROPS).isRequired,
      movementsTotalAmount: PropTypes.number,
      endingPeriodBalances: PropTypes.shape({
        walletsTotalBalanceUsd: PropTypes.number,
        positionsTotalPlUsd: PropTypes.number,
        totalResult: PropTypes.number,
      }),
      totalResult: PropTypes.number,
    }).isRequired,
  }).isRequired,
  pageLoading: PropTypes.bool.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  getFullTime: PropTypes.func.isRequired,
  timeOffset: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
