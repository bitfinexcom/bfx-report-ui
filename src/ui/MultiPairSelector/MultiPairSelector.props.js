import PropTypes from 'prop-types'

export const propTypes = {
  currentFilters: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  handleTagRemove: PropTypes.func.isRequired,
  onPairSelect: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  currentFilters: [],
  disabled: false,
  pairs: [],
  existingPairs: [],
}
