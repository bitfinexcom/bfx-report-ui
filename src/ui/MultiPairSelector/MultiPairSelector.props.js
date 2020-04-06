import PropTypes from 'prop-types'

export const propTypes = {
  currentFilters: PropTypes.arrayOf(PropTypes.string),
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  togglePair: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
}

export const defaultProps = {
  currentFilters: [],
  pairs: [],
  existingPairs: [],
}
