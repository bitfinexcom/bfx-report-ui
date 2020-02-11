import PropTypes from 'prop-types'

export const propTypes = {
  currentPair: PropTypes.string.isRequired,
  onPairSelect: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
}

export const defaultProps = {
  pairs: [],
}
