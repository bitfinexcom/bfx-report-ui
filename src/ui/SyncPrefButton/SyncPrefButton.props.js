import PropTypes from 'prop-types'

export const propTypes = {
  isSyncing: PropTypes.bool.isRequired,
  setSyncPref: PropTypes.func.isRequired,
  startTime: PropTypes.number,
  syncPairs: PropTypes.arrayOf(String),
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  syncPairs: [],
  startTime: 0,
}
