import PropTypes from 'prop-types'

export const propTypes = {
  setTheme: PropTypes.func.isRequired,
  setTimeZone: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.string,
  timezone: PropTypes.string,
}

export const defaultProps = {}
