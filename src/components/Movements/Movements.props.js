import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const MOVEMENTS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  mtsStarted: PropTypes.number.isRequired,
  mtsUpdated: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  destinationAddress: PropTypes.string,
  timezone: PropTypes.string,
})

export const propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(MOVEMENTS_ENTRIES_PROPS).isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  fetchMovements: PropTypes.func.isRequired,
  fetchNextMovements: PropTypes.func.isRequired,
  fetchPrevMovements: PropTypes.func.isRequired,
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
  fetchMovements: () => {},
  fetchNextMovements: () => {},
  fetchPrevMovements: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  setTargetSymbol: () => {},
}
