import PropTypes from 'prop-types'

import { CANDLES_PROPS, TRADES_PROPS } from 'components/Candles/Candles.props'

export const propTypes = {
  candles: CANDLES_PROPS,
  trades: TRADES_PROPS,
  fetchData: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export const defaultProps = {}
