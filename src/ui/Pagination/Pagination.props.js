import PropTypes from 'prop-types'

export const propTypes = {
  target: PropTypes.string.isRequired,
  entriesSize: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number.isRequired,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  jumpPage: PropTypes.func,
  fetchNext: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  loading: false,
  nextPage: false,
}
