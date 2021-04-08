import PropTypes from 'prop-types'

const LOGINS_ENTRIES_PROPS = PropTypes.shape({
  id: PropTypes.number.isRequired,
  mts: PropTypes.number.isRequired,
  ip: PropTypes.string.isRequired,
  browser: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  mobile: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  extra: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  entries: PropTypes.arrayOf(LOGINS_ENTRIES_PROPS).isRequired,
  fetchData: PropTypes.func.isRequired,
  getFullTime: PropTypes.func.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {}
