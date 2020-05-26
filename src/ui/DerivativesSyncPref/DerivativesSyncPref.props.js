import PropTypes from 'prop-types'

export const propTypes = {
  setSyncPref: PropTypes.func.isRequired,
  syncPairs: PropTypes.arrayOf(String),
  syncMode: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
