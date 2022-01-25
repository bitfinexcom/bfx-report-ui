import PropTypes from 'prop-types'

export const propTypes = {
  authData: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  addSubAccount: PropTypes.func.isRequired,
  addMultipleAccsEnabled: PropTypes.bool,
  masterAccount: PropTypes.string,
  updateSubAccount: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubAccount: PropTypes.bool.isRequired,
    isNotProtected: PropTypes.bool.isRequired,
  })).isRequired,
}

export const defaultProps = {
  addMultipleAccsEnabled: true,
  masterAccount: undefined,
}
