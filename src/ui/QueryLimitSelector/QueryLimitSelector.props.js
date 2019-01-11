import PropTypes from 'prop-types'

export const propTypes = {
  getQueryLimit: PropTypes.func.isRequired,
  setQueryLimit: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}

export const defaultProps = {
  getQueryLimit: () => {},
  setQueryLimit: () => {},
  target: '',
}
