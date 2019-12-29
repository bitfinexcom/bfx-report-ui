import PropTypes from 'prop-types'

export const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  latestPaginationTimestamp: PropTypes.number,
  getFullTime: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  proceedRequest: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  latestPaginationTimestamp: undefined,
}
