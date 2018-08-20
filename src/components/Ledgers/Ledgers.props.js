import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const LEDGERS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  mts: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
})

export const propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  currentSymbol: PropTypes.string,
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(LEDGERS_ENTRIES_PROPS).isRequired,
  fetchLedgers: PropTypes.func.isRequired,
  fetchNextLedgers: PropTypes.func.isRequired,
  fetchPrevLedgers: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  setCurrentSymbol: PropTypes.func.isRequired,
}

export const defaultProps = {
  currencies: [],
  offset: 0,
  entries: [],
  fetchLedgers: () => {},
  fetchNextLedgers: () => {},
  fetchPrevLedgers: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  setCurrentSymbol: () => {},
}
