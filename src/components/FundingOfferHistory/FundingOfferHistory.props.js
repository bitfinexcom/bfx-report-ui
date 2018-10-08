import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const FOFFER_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  amountOrig: PropTypes.number.isRequired,
  type: PropTypes.string,
  status: PropTypes.string,
  rate: PropTypes.number,
  period: PropTypes.number,
  mtsUpdate: PropTypes.number.isRequired,
})

export const propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
  currencies: PropTypes.objectOf(PropTypes.string),
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(FOFFER_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchFoffer: PropTypes.func.isRequired,
  fetchNextFOffer: PropTypes.func.isRequired,
  fetchPrevFOffer: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  setTargetSymbol: PropTypes.func.isRequired,
  targetSymbol: PropTypes.string,
  timezone: PropTypes.string,
}

export const defaultProps = {
  coins: [],
  offset: 0,
  entries: [],
  existingCoins: [],
  fetchFoffer: () => {},
  fetchNextFOffer: () => {},
  fetchPrevFOffer: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  setTargetSymbol: () => {},
}
