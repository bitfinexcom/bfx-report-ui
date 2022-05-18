import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  daysOnly: PropTypes.bool,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  className: '',
  defaultValue: null,
  daysOnly: false,
}
