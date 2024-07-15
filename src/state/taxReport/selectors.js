import types from './constants'

export const getTaxReport = state => state.taxReport
export const getTaxTransactions = state => getTaxReport(state).transactions

export const getTransactionsData = state => getTaxTransactions(state)?.data ?? []
export const getTransactionsPageLoading = state => getTaxTransactions(state)?.pageLoading ?? false
export const getTransactionsDataReceived = state => getTaxTransactions(state)?.dataReceived ?? false
export const getTransactionsStrategy = state => getTaxTransactions(state)?.strategy ?? types.STRATEGY_LIFO
export const getTransactionsShowDisclaimer = state => getTaxTransactions(state)?.showDisclaimer ?? false

export default {
  getTaxReport,
  getTaxTransactions,
  getTransactionsData,
  getTransactionsStrategy,
  getTransactionsPageLoading,
  getTransactionsDataReceived,
  getTransactionsShowDisclaimer,
}
