import PropTypes from 'prop-types'

export const propTypes = {
  setTimezone: PropTypes.func.isRequired,
  setInputTimezone: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  timezone: PropTypes.string,
  inputTimezone: PropTypes.string,
}

export const defaultProps = {}
