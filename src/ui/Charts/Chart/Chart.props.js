import PropTypes from 'prop-types'

export const propTypes = {
  data: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  isSumUpEnabled: PropTypes.bool,
}

export const defaultProps = {
  isSumUpEnabled: false,
}
