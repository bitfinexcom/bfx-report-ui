import PropTypes from 'prop-types'

export const propTypes = {
  dataLen: PropTypes.number.isRequired,
  getQueryLimit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  jumpPage: PropTypes.func,
  offset: PropTypes.number.isRequired,
  nextClick: PropTypes.func,
  prevClick: PropTypes.func,
  pageOffset: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  getQueryLimit: () => {},
  jumpPage: () => {},
  nextClick: () => {},
  prevClick: () => {},
  loading: false,
  nextPage: false,
}
