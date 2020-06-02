import PropTypes from 'prop-types'

export const propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export const defaultProps = {
  label: '',
  onChange: () => {},
  name: '',
  placeholder: '',
  value: '',
}
