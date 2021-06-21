import PropTypes from 'prop-types'

export const propTypes = {
  isSyncing: PropTypes.bool.isRequired,
  syncProgress: PropTypes.number.isRequired,
  startSyncNow: PropTypes.func,
  stopSyncNow: PropTypes.func,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  startSyncNow: () => {},
  stopSyncNow: () => {},
}
