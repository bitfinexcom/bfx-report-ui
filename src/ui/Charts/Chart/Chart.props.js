import PropTypes from 'prop-types'

export const propTypes = {
  data: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  isSumUpEnabled: PropTypes.bool,
  showLegend: PropTypes.bool,
  aspect: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export const defaultProps = {
  isSumUpEnabled: false,
  showLegend: true,
  aspect: 2.22,
  width: '100%',
  height: '100%',
}
