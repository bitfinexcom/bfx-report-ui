import PropTypes from 'prop-types'

export const propTypes = {
  setSyncPref: PropTypes.func.isRequired,
  syncPairs: PropTypes.arrayOf(String),
  isSyncing: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
