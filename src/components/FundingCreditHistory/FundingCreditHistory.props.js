import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const FCREDIT_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  side: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  status: PropTypes.string,
  rate: PropTypes.number,
  period: PropTypes.number,
  mtsUpdate: PropTypes.number.isRequired,
  mtsOpening: PropTypes.number,
  mtsLastPayout: PropTypes.number,
  positionPair: PropTypes.string,
})

export const propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(FCREDIT_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchFcredit: PropTypes.func.isRequired,
  fetchNextFCredit: PropTypes.func.isRequired,
  fetchPrevFCredit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  setTargetSymbol: PropTypes.func.isRequired,
  targetSymbol: PropTypes.string,
}

export const defaultProps = {
  coins: [],
  offset: 0,
  entries: [],
  existingCoins: [],
  fetchFcredit: () => {},
  fetchNextFCredit: () => {},
  fetchPrevFCredit: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  setTargetSymbol: () => {},
}
