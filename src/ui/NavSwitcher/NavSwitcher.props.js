import PropTypes from 'prop-types'

export const propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export const defaultProps = {}
