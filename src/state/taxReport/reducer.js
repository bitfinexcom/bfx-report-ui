import authTypes from 'state/auth/constants'
import deductFeesTypes from 'ui/FeesDeductionSelector/constants'

import types from './constants'

const transactionsInitState = {
  data: [],
  progress: null,
  pageLoading: false,
  dataReceived: false,
  showDisclaimer: true,
  strategy: types.STRATEGY_LIFO,
  showCalcPrecisionModal: false,
  shouldFeesBeDeducted: deductFeesTypes.FALSE,
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
          shouldFeesBeDeducted: state.transactions.shouldFeesBeDeducted,
        },
      }
    case types.UPDATE_TRANSACTIONS: {
      return {
        ...state,
        transactions: {
          data: payload,
          progress: null,
          pageLoading: false,
          dataReceived: true,
          strategy: state.transactions.strategy,
          showDisclaimer: state.transactions.showDisclaimer,
          shouldFeesBeDeducted: state.transactions.shouldFeesBeDeducted,
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
    case types.SET_SHOW_TAX_REPORT_PRECISION_MODAL: {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          showCalcPrecisionModal: payload,
        },
      }
    }
    case types.SET_GENERATION_PROGRESS: {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          progress: payload,
        },
      }
    }
    case types.FETCH_FAIL:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          progress: null,
          pageLoading: false,
          dataReceived: true,
        },
      }
    case types.CANCEL_TAX_REPORT_GENERATION:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          progress: null,
          pageLoading: false,
          dataReceived: true,
        },
      }
    case types.SET_DEDUCT_FEES: {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          shouldFeesBeDeducted: payload,
        },
      }
    }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default taxReportReducer
