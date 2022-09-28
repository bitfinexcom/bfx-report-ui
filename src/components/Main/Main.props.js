import PropTypes from 'prop-types'

export const propTypes = {
  authIsShown: PropTypes.bool.isRequired,
  authStatus: PropTypes.bool.isRequired,
  errorDialogDisabled: PropTypes.bool.isRequired,
}

export const defaultProps = {
  authIsShown: false,
}
