/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types'

export const propTypes = {
  params: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
