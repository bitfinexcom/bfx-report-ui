import authTypes from 'state/auth/constants'

import types from './constants'

const transactionsInitState = {
  data: [],
  pageLoading: false,
  dataReceived: false,
  strategy: types.STRATEGY_LIFO,
}

const initialState = {
  transactions: transactionsInitState,
}

export function taxReportReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_TRANSACTIONS:
    case types.REFRESH_TRANSACTIONS:
      return {
        ...state,
        transactions: {
          pageLoading: true,
          strategy: state.transactions.strategy,
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
    case types.FETCH_FAIL:
      return state
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default taxReportReducer
