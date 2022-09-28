import PropTypes from 'prop-types'

export const propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
}

export const defaultProps = {
  label: '',
  type: 'password',
}
