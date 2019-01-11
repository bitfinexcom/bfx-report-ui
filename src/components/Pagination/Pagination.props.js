import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

export const propTypes = {
  dataLen: PropTypes.number.isRequired,
  getQueryLimit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func,
  offset: PropTypes.number.isRequired,
  nextClick: PropTypes.func,
  prevClick: PropTypes.func,
  pageOffset: PropTypes.number.isRequired,
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
