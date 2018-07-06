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
  entries: PropTypes.arrayOf(LEDGERS_ENTRIES_PROPS).isRequired,
  intl: intlShape.isRequired,
}

export const defaultProps = {
  entries: [],
  intl: {},
}
