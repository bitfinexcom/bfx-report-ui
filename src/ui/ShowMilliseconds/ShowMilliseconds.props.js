import PropTypes from 'prop-types'

export const propTypes = {
  milliseconds: PropTypes.bool,
  showMilliseconds: PropTypes.func,
}

export const defaultProps = {
  milliseconds: false,
  showMilliseconds: () => {},
}
