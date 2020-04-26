import PropTypes from 'prop-types'

export const propTypes = {
  syncPairs: PropTypes.arrayOf(String),
  startTime: PropTypes.number,
  t: PropTypes.func.isRequired,

  syncMode: PropTypes.string.isRequired,
  config: PropTypes.array.isRequired,
  defaultStartTime: PropTypes.number.isRequired,
  editConfig: PropTypes.func.isRequired,
}

export const defaultProps = {
  syncPairs: [],
  startTime: 0,
}
