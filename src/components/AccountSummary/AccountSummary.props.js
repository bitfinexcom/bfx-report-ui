import PropTypes from 'prop-types'

export const propTypes = {
  data: PropTypes.object.isRequired,
  dataReceived: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  pageLoading: PropTypes.bool.isRequired,
}

export const defaultProps = {}
