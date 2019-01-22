import PropTypes from 'prop-types'

export const propTypes = {
  setLang: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  setLang: () => {},
}
