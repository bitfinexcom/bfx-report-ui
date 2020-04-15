import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  end: PropTypes.number,
  icon: PropTypes.bool,
  start: PropTypes.number,
  timezone: PropTypes.string,
}

export const defaultProps = {
  className: '',
  end: 0,
  icon: true,
  start: 0,
}
