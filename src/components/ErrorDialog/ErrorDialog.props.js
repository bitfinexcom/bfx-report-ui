import PropTypes from 'prop-types'

export const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  syncMode: PropTypes.string.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  proceedRequest: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
