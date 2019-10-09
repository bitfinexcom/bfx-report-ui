/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types'

export const propTypes = {
  params: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
  }).isRequired,
  fetchTaxReport: PropTypes.func.isRequired,
  fetchSnapshot: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
