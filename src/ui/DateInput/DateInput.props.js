import PropTypes from 'prop-types'

export const propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  inputTimezone: PropTypes.string,
  daysOnly: PropTypes.bool,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  defaultValue: null,
  inputTimezone: '',
  daysOnly: false,
}
