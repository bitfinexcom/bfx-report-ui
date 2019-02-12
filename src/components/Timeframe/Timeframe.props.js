import PropTypes from 'prop-types'

export const propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  menuMode: PropTypes.string,
  t: PropTypes.func.isRequired,
  timezone: PropTypes.string,
}

export const defaultProps = {
  start: 0,
  end: 0,
  menuMode: '',
  timezone: '',
}
