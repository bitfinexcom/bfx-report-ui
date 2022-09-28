import PropTypes from 'prop-types'

export const propTypes = {
  email: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  togglePrefDialog: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
}

export const defaultProps = {}
