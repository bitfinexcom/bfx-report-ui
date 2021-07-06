import PropTypes from 'prop-types'

export const propTypes = {
  isSyncing: PropTypes.bool.isRequired,
  syncSymbols: PropTypes.arrayOf(String),
  startTime: PropTypes.number,
  setSymbols: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  syncSymbols: [],
  startTime: 0,
  setSymbols: () => {},
}
