import PropTypes from 'prop-types'

export const propTypes = {
  candles: PropTypes.array.isRequired,
  trades: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
