import PropTypes from 'prop-types'

export const propTypes = {
  section: PropTypes.string.isRequired,
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
