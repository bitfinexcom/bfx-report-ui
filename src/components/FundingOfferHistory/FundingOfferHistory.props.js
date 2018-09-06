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
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(FOFFER_ENTRIES_PROPS).isRequired,
  fetchFoffer: PropTypes.func.isRequired,
  fetchNextFOffer: PropTypes.func.isRequired,
  fetchPrevFOffer: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
}

export const defaultProps = {
  offset: 0,
  entries: [],
  fetchFoffer: () => {},
  fetchNextFOffer: () => {},
  fetchPrevFOffer: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
}
