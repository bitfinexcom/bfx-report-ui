import PropTypes from 'prop-types'

export const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  disableDialog: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  errorMessage: 'Something went wrong',
}
