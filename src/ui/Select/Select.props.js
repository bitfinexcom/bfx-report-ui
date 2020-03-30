import PropTypes from 'prop-types'

export const propTypes = {
  filterable: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export const defaultProps = {
  filterable: false,
}
