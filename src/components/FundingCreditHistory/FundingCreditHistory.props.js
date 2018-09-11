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
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(FCREDIT_ENTRIES_PROPS).isRequired,
  fetchFcredit: PropTypes.func.isRequired,
  fetchNextFCredit: PropTypes.func.isRequired,
  fetchPrevFCredit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
}

export const defaultProps = {
  offset: 0,
  entries: [],
  fetchFcredit: () => {},
  fetchNextFCredit: () => {},
  fetchPrevFCredit: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
}
