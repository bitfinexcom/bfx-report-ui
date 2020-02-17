import PropTypes from 'prop-types'

export const propTypes = {
  data: PropTypes.object.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
