import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  end: PropTypes.number,
  start: PropTypes.number,
  timezone: PropTypes.string,
}

export const defaultProps = {
  className: '',
  end: 0,
  start: 0,
}
