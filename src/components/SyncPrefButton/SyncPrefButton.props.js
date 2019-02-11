import PropTypes from 'prop-types'

export const propTypes = {
  logout: PropTypes.func.isRequired,
  syncPairs: PropTypes.arrayOf(String),
  startTime: PropTypes.number,
  setPairs: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  textOnly: PropTypes.bool,
}

export const defaultProps = {
  logout: () => {},
  syncPairs: [],
  startTime: 0,
  setPairs: () => {},
  textOnly: false,
}
