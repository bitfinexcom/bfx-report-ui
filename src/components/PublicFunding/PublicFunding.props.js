import PropTypes from 'prop-types'

const PUBLIC_FUNDING_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  mts: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

export const propTypes = {
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(PUBLIC_FUNDING_ENTRIES_PROPS).isRequired,
  fetchPublicfunding: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  getFullTime: PropTypes.func,
  hasSyncPref: PropTypes.bool.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  setTargetSymbol: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  targetSymbol: PropTypes.string,
  timeOffset: PropTypes.string.isRequired,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  offset: 0,
  entries: [],
  fetchPublicfunding: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  getFullTime: () => {},
  hasSyncPref: false,
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  refresh: () => {},
  setTargetSymbol: () => {},
  targetSymbol: '',
  nextPage: false,
}
