import PropTypes from 'prop-types'

export const propTypes = {
  chart: PropTypes.object.isRequired,
  indicator: PropTypes.object.isRequired,
  lineSeries: PropTypes.object.isRequired,
  defaultValue: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export const defaultProps = {
  className: '',
}
