import { getCandlesPref, getPublicTradesPref, getTickersHistoryConf } from 'state/sync/selectors'
import { editCandlesPairPref, editPublicTradesPref, editTickersHistoryPairPref } from 'state/sync/actions'
import queryConstants from 'state/query/constants'

const { MENU_PUBLIC_TRADES, MENU_TICKERS, MENU_CANDLES } = queryConstants

export const getSyncPref = (state, section) => {
  switch (section) {
    case MENU_PUBLIC_TRADES:
      return getPublicTradesPref(state)
    case MENU_TICKERS:
      return getTickersHistoryConf(state)
    case MENU_CANDLES:
      return getCandlesPref(state)
    default:
      return {
        pairs: ['BTC:USD'],
        startTime: undefined,
      }
  }
}

export const getSyncPrefFunc = (section) => {
  switch (section) {
    case MENU_PUBLIC_TRADES:
      return editPublicTradesPref
    case MENU_TICKERS:
      return editTickersHistoryPairPref
    case MENU_CANDLES:
      return editCandlesPairPref
    default:
      return () => {}
  }
}

export default {
  getSyncPref,
  getSyncPrefFunc,
}
