import PropTypes from 'prop-types'

export const propTypes = {
  currency: PropTypes.string,
  destinationAddress: PropTypes.string,
  explorers: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
}

export const defaultProps = {
  currency: '',
  destinationAddress: '',
  explorers: {},
}
