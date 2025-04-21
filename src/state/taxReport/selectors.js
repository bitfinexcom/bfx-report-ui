import types from './constants'

export const getTaxReport = state => state.taxReport
export const getTaxTransactions = state => getTaxReport(state).transactions

export const getTransactionsData = state => getTaxTransactions(state)?.data ?? []
export const getTransactionsDataEntries = state => getTransactionsData(state)?.taxes ?? []
export const getTransactionsPageLoading = state => getTaxTransactions(state)?.pageLoading ?? false
export const getTransactionsDataReceived = state => getTaxTransactions(state)?.dataReceived ?? false
export const getTransactionsStrategy = state => getTaxTransactions(state)?.strategy ?? types.STRATEGY_LIFO
export const getTransactionsShowDisclaimer = state => getTaxTransactions(state)?.showDisclaimer ?? false
export const getTransactionsGenerationProgress = state => getTaxTransactions(state)?.progress ?? null
export const getTransactionsDelistedCurrencies = state => getTransactionsData(state)?.delistedCcyList ?? []
export const getTransactionsShowCalcPrecisionModal = state => getTaxTransactions(state)?.showDisclaimer ?? false

export default {
  getTaxReport,
  getTaxTransactions,
  getTransactionsData,
  getTransactionsStrategy,
  getTransactionsPageLoading,
  getTransactionsDataEntries,
  getTransactionsDataReceived,
  getTransactionsShowDisclaimer,
  getTransactionsGenerationProgress,
  getTransactionsDelistedCurrencies,
  getTransactionsShowCalcPrecisionModal,
}
