import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  currentFilters: PropTypes.arrayOf(PropTypes.string),
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  inactivePairs: PropTypes.arrayOf(PropTypes.string),
  togglePair: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
}

export const defaultProps = {
  className: '',
  currentFilters: [],
  pairs: [],
  existingPairs: [],
}
