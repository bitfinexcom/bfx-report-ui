import PropTypes from 'prop-types'

export const propTypes = {
  queryLimit: PropTypes.number.isRequired,
  setQueryLimit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}

export const defaultProps = {
  target: '',
}
