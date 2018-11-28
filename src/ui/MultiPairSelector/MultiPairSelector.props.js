import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  currentFilters: PropTypes.arrayOf(PropTypes.string),
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  handleTagRemove: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onPairSelect: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
}

export const defaultProps = {
  currentFilters: [],
  pairs: [],
  existingPairs: [],
}
