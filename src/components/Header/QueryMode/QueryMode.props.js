import PropTypes from 'prop-types'

export const propTypes = {
  syncMode: PropTypes.string.isRequired,
  switchSyncMode: PropTypes.func,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  switchSyncMode: () => {},
}
