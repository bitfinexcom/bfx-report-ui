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
})

export const propTypes = {
  entries: PropTypes.arrayOf(MOVEMENTS_ENTRIES_PROPS).isRequired,
  intl: intlShape.isRequired,
  loading: PropTypes.bool.isRequired,
}

export const defaultProps = {
  entries: [],
  intl: {},
  loading: true,
}
