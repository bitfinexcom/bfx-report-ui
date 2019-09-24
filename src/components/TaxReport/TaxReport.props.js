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

const POSITIONS_TICKERS_ENTRIES_PROPS = PropTypes.shape({
  pair: PropTypes.string.isRequired,
  amount: PropTypes.number,
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
  params: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
  }).isRequired,
  data: PropTypes.shape({
    depositsTotalAmount: PropTypes.number,
    endPositionsSnapshot: PropTypes.arrayOf(POSITIONS_ENTRIES_PROPS).isRequired,
    endTickers: PropTypes.arrayOf(POSITIONS_TICKERS_ENTRIES_PROPS).isRequired,
    movementsEntries: PropTypes.arrayOf(MOVEMENTS_ENTRIES_PROPS).isRequired,
    movementsTotalAmount: PropTypes.number,
    startPositionsSnapshot: PropTypes.arrayOf(POSITIONS_ENTRIES_PROPS).isRequired,
    startTickers: PropTypes.arrayOf(POSITIONS_TICKERS_ENTRIES_PROPS).isRequired,
    winLossTotalAmount: PropTypes.number,
    withdrawalsTotalAmount: PropTypes.number,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  getFullTime: PropTypes.func.isRequired,
  timeOffset: PropTypes.string.isRequired,
  fetchTaxReport: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
