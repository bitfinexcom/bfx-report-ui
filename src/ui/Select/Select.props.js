import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  filterable: PropTypes.bool,
  itemRenderer: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ])).isRequired,
  onChange: PropTypes.func.isRequired,
  popoverClassName: PropTypes.string,
  value: PropTypes.string.isRequired,
}

export const defaultProps = {
  filterable: false,
}
