import PropTypes from 'prop-types'

export const propTypes = {
  section: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  value: '',
}
