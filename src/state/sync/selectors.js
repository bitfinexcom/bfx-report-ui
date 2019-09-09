const getSync = state => state.sync || {}

export const getSyncMode = state => getSync(state).syncMode || false
export const getSyncProgress = state => getSync(state).progress || 0

const getPublicTradesPref = state => getSync(state).publicTrades
export const getPublicTradesStartTime = state => getPublicTradesPref(state).startTime
export const getPublicTradesPairs = state => getPublicTradesPref(state).pairs

const getPublicFundingPref = state => getSync(state).publicFunding
export const getPublicFundingStartTime = state => getPublicFundingPref(state).startTime
export const getPublicFundingSymbols = state => getPublicFundingPref(state).symbols

const getTickersHistoryPref = state => getSync(state).tickersHistory
export const getTickersHistoryStartTime = state => getTickersHistoryPref(state).startTime
export const getTickersHistoryPairs = state => getTickersHistoryPref(state).pairs

export default {
  getSyncMode,
  getPublicTradesStartTime,
  getPublicTradesPairs,
  getPublicFundingStartTime,
  getPublicFundingSymbols,
  getTickersHistoryStartTime,
  getTickersHistoryPairs,
}
