const getSync = state => state.sync || {}
const getSyncConf = state => getSync(state).config || {}

export const getSyncMode = state => getSync(state).syncMode || false
export const getSyncProgress = state => getSync(state).progress || 0
export const getIsSyncing = state => getSync(state).isSyncing || false

export const getPublicTradesPref = state => getSyncConf(state).publicTradesConf || {}
export const getPublicTradesStartTime = state => getPublicTradesPref(state).startTime
export const getPublicTradesPairs = state => getPublicTradesPref(state).pairs || []

export const getPublicFundingPref = state => getSyncConf(state).publicFundingConf || {}
export const getPublicFundingStartTime = state => getPublicFundingPref(state).startTime
export const getPublicFundingSymbols = state => getPublicFundingPref(state).symbols || []

export const getTickersHistoryConf = state => getSyncConf(state).tickersHistoryConf || {}
export const getTickersHistoryStartTime = state => getTickersHistoryConf(state).startTime
export const getTickersHistoryPairs = state => getTickersHistoryConf(state).pairs || []

export const getCandlesConf = state => getSyncConf(state).candlesConf || []
export const getStatusMessagesConf = state => getSyncConf(state).statusMessagesConf || []

export default {
  getSyncMode,
  getIsSyncing,
  getPublicTradesPref,
  getPublicTradesStartTime,
  getPublicTradesPairs,
  getPublicFundingPref,
  getPublicFundingStartTime,
  getPublicFundingSymbols,
  getTickersHistoryConf,
  getTickersHistoryStartTime,
  getTickersHistoryPairs,
  getCandlesConf,
  getStatusMessagesConf,
}
