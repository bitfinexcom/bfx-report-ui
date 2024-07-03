import authTypes from 'state/auth/constants'

import types from './constants'

const transactionsInitState = {
  data: [],
  pageLoading: false,
  dataReceived: false,
  showDisclaimer: true,
  strategy: types.STRATEGY_LIFO,
}

const initialState = {
  transactions: transactionsInitState,
}

export function taxReportReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_TRANSACTIONS:
      return {
        ...state,
        transactions: {
          pageLoading: true,
          strategy: state.transactions.strategy,
          showDisclaimer: state.transactions.showDisclaimer,
        },
      }
    case types.UPDATE_TRANSACTIONS: {
      return {
        ...state,
        transactions: {
          dataReceived: true,
          pageLoading: false,
          data: payload,
          strategy: state.transactions.strategy,
          showDisclaimer: state.transactions.showDisclaimer,
        },
      }
    }
    case types.SET_TRANSACTIONS_STRATEGY: {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          strategy: payload,
        },
      }
    }
    case types.SET_SHOW_DISCLAIMER: {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          showDisclaimer: payload,
        },
      }
    }
    case types.FETCH_FAIL:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          dataReceived: false,
          pageLoading: false,
        },
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default taxReportReducer
