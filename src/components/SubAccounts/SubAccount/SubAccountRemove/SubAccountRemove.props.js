import PropTypes from 'prop-types'

export const propTypes = {
  masterAccount: PropTypes.string,
  removeSubAccount: PropTypes.func.isRequired,
}

export const defaultProps = {
  masterAccount: undefined,
}
