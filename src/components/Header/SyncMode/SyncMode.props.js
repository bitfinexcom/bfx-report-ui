import PropTypes from 'prop-types'

export const propTypes = {
  syncMode: PropTypes.string.isRequired,
  syncProgress: PropTypes.number.isRequired,
  startSyncNow: PropTypes.func,
  stopSyncNow: PropTypes.func,
  switchSyncMode: PropTypes.func,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  startSyncNow: () => {},
  stopSyncNow: () => {},
  switchSyncMode: () => {},
}
