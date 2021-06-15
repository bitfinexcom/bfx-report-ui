import PropTypes from 'prop-types'

export const propTypes = {
  syncMode: PropTypes.string.isRequired,
  syncProgress: PropTypes.number.isRequired,
  setSyncMode: PropTypes.func,
  startSyncing: PropTypes.func,
  stopSyncing: PropTypes.func,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  syncMode: '',
  setSyncMode: () => {},
  startSyncing: () => {},
  stopSyncing: () => {},
}
