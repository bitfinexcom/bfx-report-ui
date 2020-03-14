const getSync = state => state.sync || {}
const getSyncConf = state => getSync(state).config || {}

export const getSyncMode = state => getSync(state).syncMode || false
export const getSyncProgress = state => getSync(state).progress || 0

export const getPublicTradesPref = state => getSyncConf(state).publicTradesConf || {}
export const getPublicTradesStartTime = state => getPublicTradesPref(state).startTime
export const getPublicTradesPairs = state => getPublicTradesPref(state).pairs || []

export const getPublicFundingPref = state => getSyncConf(state).publicFundingConf || {}
export const getPublicFundingStartTime = state => getPublicFundingPref(state).startTime
export const getPublicFundingSymbols = state => getPublicFundingPref(state).symbols || []

export const getTickersHistoryConf = state => getSyncConf(state).tickersHistoryConf || {}
export const getTickersHistoryStartTime = state => getTickersHistoryConf(state).startTime
export const getTickersHistoryPairs = state => getTickersHistoryConf(state).pairs || []

export const getCandlesPref = state => getSyncConf(state).candlesConf || {}
export const getCandlesStartTime = state => getCandlesPref(state).startTime
export const getCandlesPairs = state => getCandlesPref(state).pairs || []

export default {
  getSyncMode,
  getPublicTradesPref,
  getPublicTradesStartTime,
  getPublicTradesPairs,
  getPublicFundingPref,
  getPublicFundingStartTime,
  getPublicFundingSymbols,
  getTickersHistoryConf,
  getTickersHistoryStartTime,
  getTickersHistoryPairs,
  getCandlesPref,
  getCandlesStartTime,
  getCandlesPairs,
}
