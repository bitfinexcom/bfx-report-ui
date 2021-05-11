import PropTypes from 'prop-types'

export const propTypes = {
  className: PropTypes.string,
  end: PropTypes.number,
  icon: PropTypes.bool,
  start: PropTypes.number,
  timezone: PropTypes.string,
  togglePreferencesDialog: PropTypes.func.isRequired,
  toggleTimeFrameDialog: PropTypes.func.isRequired,
}

export const defaultProps = {
  className: '',
  end: 0,
  icon: true,
  start: 0,
}
