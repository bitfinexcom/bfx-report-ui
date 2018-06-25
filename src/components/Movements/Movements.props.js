import PropTypes from 'prop-types'

export const propTypes = {
  entries: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
}

export const defaultProps = {
  entries: [],
  intl: {},
}
