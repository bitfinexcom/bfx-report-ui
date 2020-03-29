import PropTypes from 'prop-types'

export const propTypes = {
  setTheme: PropTypes.func.isRequired,
  setTimezone: PropTypes.func.isRequired,
  setInputTimezone: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.string,
  timezone: PropTypes.string,
  inputTimezone: PropTypes.string,
}

export const defaultProps = {}
