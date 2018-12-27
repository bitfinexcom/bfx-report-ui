import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const FLOAN_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  side: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  status: PropTypes.string,
  rate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  period: PropTypes.number,
  mtsUpdate: PropTypes.number.isRequired,
  mtsOpening: PropTypes.number,
  mtsLastPayout: PropTypes.number,
})

export const propTypes = {
  addTargetSymbol: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(FLOAN_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchFloan: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetSymbol: PropTypes.func.isRequired,
  targetSymbols: PropTypes.arrayOf(PropTypes.string),
  timeOffset: PropTypes.string.isRequired,
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
  fetchFloan: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  getFullTime: () => {},
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
