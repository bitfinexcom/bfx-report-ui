import PropTypes from 'prop-types'

const RISK_ENTRIES_PROPS = PropTypes.shape({
  mts: PropTypes.number.isRequired,
})

export const propTypes = {
  entries: PropTypes.arrayOf(RISK_ENTRIES_PROPS).isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  setParams: PropTypes.func.isRequired,
  fetchRisk: PropTypes.func.isRequired,
}

export const defaultProps = {
  entries: [],
  loading: true,
  refresh: () => {},
  params: {},
  setParams: () => {},
  fetchRisk: () => {},
}
