import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  filterable: PropTypes.bool,
  itemPredicate: PropTypes.func,
  itemRenderer: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number]).isRequired,
      label: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.node.isRequired,
      ]),
    }),
  ])).isRequired,
  onChange: PropTypes.func.isRequired,
  popoverClassName: PropTypes.string,
  t: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number]).isRequired,
}

export const defaultProps = {
  filterable: false,
}
