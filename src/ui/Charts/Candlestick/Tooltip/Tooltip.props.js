import PropTypes from 'prop-types'

export const propTypes = {
  chart: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  candleSeries: PropTypes.object.isRequired,
  tradeSeries: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
