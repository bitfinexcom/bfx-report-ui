import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  inputTimezone: PropTypes.string,
  daysOnly: PropTypes.bool,
  t: PropTypes.func.isRequired,
  timezone: PropTypes.string,
}

export const defaultProps = {
  className: '',
  defaultValue: null,
  inputTimezone: '',
  daysOnly: false,
}
