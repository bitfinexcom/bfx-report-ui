import PropTypes from 'prop-types'

const POSITIONS_ENTRIES_PROPS = PropTypes.shape({
  amount: PropTypes.number,
  basePrice: PropTypes.number,
  liquidationPrice: PropTypes.number,
  marginFunding: PropTypes.number,
  marginFundingType: PropTypes.number,
  mtsUpdate: PropTypes.number,
  pair: PropTypes.string.isRequired,
  pl: PropTypes.number,
  plPerc: PropTypes.number,
})

export const propTypes = {
  totalPlUsd: PropTypes.number,
  entries: PropTypes.arrayOf(POSITIONS_ENTRIES_PROPS).isRequired,
  getFullTime: PropTypes.func,
  timeOffset: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {
  totalPlUsd: null,
  entries: [],
  getFullTime: () => {},
}
