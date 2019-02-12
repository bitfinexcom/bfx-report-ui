import PropTypes from 'prop-types'

export const propTypes = {
  SyncMode: PropTypes.string.isRequired,
  startSyncing: PropTypes.func,
  stopSyncing: PropTypes.func,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  SyncMode: '',
  startSyncing: () => {},
  stopSyncing: () => {},
}
