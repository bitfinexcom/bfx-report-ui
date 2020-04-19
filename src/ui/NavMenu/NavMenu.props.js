import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  className: '',
}
