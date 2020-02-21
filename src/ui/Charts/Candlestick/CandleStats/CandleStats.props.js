import PropTypes from 'prop-types'

export const propTypes = {
  chart: PropTypes.object.isRequired,
  candleSeries: PropTypes.object.isRequired,
  defaultCandle: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
