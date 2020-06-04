import PropTypes from 'prop-types'

const CHANGE_LOGS_ENTRIES_PROPS = PropTypes.shape({
  log: PropTypes.string.isRequired,
  mts: PropTypes.number.isRequired,
  ip: PropTypes.string.isRequired,
  userAgent: PropTypes.string.isRequired,
})

export const propTypes = {
  columns: PropTypes.object.isRequired,
  entries: PropTypes.arrayOf(CHANGE_LOGS_ENTRIES_PROPS).isRequired,
  fetchData: PropTypes.func.isRequired,
  getFullTime: PropTypes.func.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  timeOffset: PropTypes.string.isRequired,
}

export const defaultProps = {}
