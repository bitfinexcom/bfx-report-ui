import PropTypes from 'prop-types'
import moment from 'moment-timezone'

export const propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  daysOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  t: PropTypes.func.isRequired,
  timezone: PropTypes.string,
}

export const defaultProps = {
  className: '',
  defaultValue: null,
  daysOnly: false,
  isDisabled: false,
  timezone: moment.tz.guess(), // current timezone
}
