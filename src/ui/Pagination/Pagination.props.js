import PropTypes from 'prop-types'

export const propTypes = {
  target: PropTypes.string.isRequired,
  entriesSize: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  jumpPage: PropTypes.func,
  offset: PropTypes.number.isRequired,
  fetchNext: PropTypes.func.isRequired,
  pageOffset: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  loading: false,
  nextPage: false,
}
