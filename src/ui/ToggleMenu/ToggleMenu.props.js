import PropTypes from 'prop-types'

export const propTypes = {
  handleClickCustom: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  menuMode: PropTypes.string,
  t: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}

export const defaultProps = {
  menuMode: '',
}
