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
  entries: PropTypes.arrayOf(LEDGERS_ENTRIES_PROPS).isRequired,
  fetchLedgers: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
}

export const defaultProps = {
  currencies: [],
  entries: [],
  fetchLedgers: () => {},
  intl: {},
  loading: true,
}
