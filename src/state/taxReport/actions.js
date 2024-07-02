import types from './constants'

export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
  }
}

export function fetchTaxReportTransactions() {
  return {
    type: types.FETCH_TRANSACTIONS,
  }
}

export function updateTaxReportTransactions(payload) {
  return {
    type: types.UPDATE_TRANSACTIONS,
    payload,
  }
}

export function setTransactionsStrategy(payload) {
  return {
    type: types.SET_TRANSACTIONS_STRATEGY,
    payload,
  }
}

export function setShowDisclaimer(payload) {
  return {
    type: types.SET_SHOW_DISCLAIMER,
    payload,
  }
}

export default {
  fetchFail,
  setShowDisclaimer,
  setTransactionsStrategy,
  fetchTaxReportTransactions,
  updateTaxReportTransactions,
}
