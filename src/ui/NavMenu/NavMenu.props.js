import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  showMenuPopover: PropTypes.bool,
  t: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
}

export const defaultProps = {
  className: '',
  showMenuPopover: true,
}
