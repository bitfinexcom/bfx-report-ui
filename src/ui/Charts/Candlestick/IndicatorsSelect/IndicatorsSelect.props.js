import PropTypes from 'prop-types'

export const propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export const defaultProps = {
  className: '',
}
