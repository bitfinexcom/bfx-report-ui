import authTypes from 'state/auth/constants'
import { fetch, fetchFail } from 'state/reducers.helper'

import types from './constants'

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  data: {},
  minimumBalance: 0.01,
  useMinBalance: false,
}

export function summaryByAssetReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH:
      return fetch(state)
    case types.UPDATE: {
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        data: payload,
      }
    }
    case types.SET_MIN_BALANCE: {
      return {
        ...state,
        minimumBalance: +payload,
      }
    }
    case types.TOGGLE_USE_MIN_BALANCE: {
      return {
        ...state,
        useMinBalance: !state.useMinBalance,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.REFRESH:
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default summaryByAssetReducer
