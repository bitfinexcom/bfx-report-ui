import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const POSITIONS_ENTRIES_PROPS = PropTypes.shape({
  amount: PropTypes.number,
  basesPrice: PropTypes.number,
  liquidationPrice: PropTypes.number,
  marginFunding: PropTypes.number,
  marginFundingType: PropTypes.number,
  mtsUpdate: PropTypes.number.isRequired,
  pair: PropTypes.string.isRequired,
  pl: PropTypes.number,
  plPerc: PropTypes.number,
})

export const propTypes = {
  addTargetPair: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(POSITIONS_ENTRIES_PROPS).isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchNext: PropTypes.func.isRequired,
  fetchPositions: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  removeTargetPair: PropTypes.func.isRequired,
  targetPairs: PropTypes.arrayOf(PropTypes.string),
  timezone: PropTypes.string,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  addTargetPair: () => {},
  offset: 0,
  entries: [],
  existingPairs: [],
  fetchNext: () => {},
  fetchPrev: () => {},
  fetchPositions: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  removeTargetPair: () => {},
  targetPairs: '',
  nextPage: false,
}
