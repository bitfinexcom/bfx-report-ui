import types from './constants'

/**
 * Create an action to fetch public Funding data.
 * @param {Object} options
 */
export function fetchPublicFunding(options = {}) {
  return {
    type: types.FETCH_PUBLIC_FUNDING,
    payload: options,
  }
}

/**
 * Create an action to note fetch fail.
 * @param {number} payload fail message
 */
export function fetchFail(payload) {
  return {
    type: types.FETCH_FAIL,
    payload,
  }
}

/**
 * Create an action to refresh public Funding.
 */
export function refresh() {
  return {
    type: types.REFRESH,
  }
}

/**
 * Create an action to update public Funding.
 * @param {Object[]} data data set
 */
export function updatePublicFunding(data) {
  return {
    type: types.UPDATE_PUBLIC_FUNDING,
    payload: {
      data,
    },
  }
}

/**
 * Create an action to set current symbol.
 * @param {string} symbol symbol
 */
export function setTargetSymbol(symbol) {
  return {
    type: types.SET_SYMBOL,
    payload: symbol,
  }
}

export default {
  fetchFail,
  fetchPublicFunding,
  refresh,
  setTargetSymbol,
  updatePublicFunding,
}
