import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const FOFFER_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  amountOrig: PropTypes.number.isRequired,
  amountExecuted: PropTypes.number.isRequired,
  type: PropTypes.string,
  status: PropTypes.string,
  rate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  period: PropTypes.number,
  mtsUpdate: PropTypes.number.isRequired,
})

export const propTypes = {
  addTargetSymbol: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(FOFFER_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchFoffer: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetSymbol: PropTypes.func.isRequired,
  targetSymbols: PropTypes.arrayOf(PropTypes.string),
  timezone: PropTypes.string,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  addTargetSymbol: () => {},
  offset: 0,
  entries: [],
  existingCoins: [],
  fetchFoffer: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  removeTargetSymbol: () => {},
  targetSymbols: [],
  nextPage: false,
}
