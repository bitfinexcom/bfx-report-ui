import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const FLOAN_ENTRIES_PROPS = PropTypes.shape({
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
})

export const propTypes = {
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(FLOAN_ENTRIES_PROPS).isRequired,
  fetchFloan: PropTypes.func.isRequired,
  fetchNextFLoan: PropTypes.func.isRequired,
  fetchPrevFLoan: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
}

export const defaultProps = {
  offset: 0,
  entries: [],
  fetchFloan: () => {},
  fetchNextFLoan: () => {},
  fetchPrevFLoan: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
}
