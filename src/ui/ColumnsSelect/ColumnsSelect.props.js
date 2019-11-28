import PropTypes from 'prop-types'

export const propTypes = {
  target: PropTypes.string.isRequired,
  columns: PropTypes.object.isRequired,
  setColumns: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  columns: {},
}
