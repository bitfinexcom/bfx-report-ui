import PropTypes from 'prop-types'

export const propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  inputTimezone: PropTypes.string,
}

export const defaultProps = {
  value: null,
  inputTimezone: '',
}
