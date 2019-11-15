import PropTypes from 'prop-types'

export const propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  children: PropTypes.any,
}

export const defaultProps = {
  content: '',
  className: '',
  children: '',
}
