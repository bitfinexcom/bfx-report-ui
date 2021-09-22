import PropTypes from 'prop-types'

export const propTypes = {
  syncMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool]).isRequired,
  switchSyncMode: PropTypes.func,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  switchSyncMode: () => {},
}
