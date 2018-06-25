import PropTypes from 'prop-types'

export const propTypes = {
  intl: PropTypes.object.isRequired,
  showAuth: PropTypes.func.isRequired,
}

export const defaultProps = {
  intl: {},
  showAuth: () => {},
}
