import PropTypes from 'prop-types'

export const propTypes = {
  subUsers: PropTypes.array,
  masterAccount: PropTypes.string,
  removeSubAccount: PropTypes.func.isRequired,
}

export const defaultProps = {
  subUsers: [],
  masterAccount: undefined,
}
