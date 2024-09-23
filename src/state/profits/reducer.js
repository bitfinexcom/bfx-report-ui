import authTypes from 'state/auth/constants'
import timeRangeTypes from 'state/timeRange/constants'

import { fetchFail } from 'state/reducers.helper'

import types from './constants'

export const initialState = {
  entries: [],
  pageLoading: false,
  dataReceived: false,
}

export function profitsReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_PROFITS:
      return {
        ...initialState,
        pageLoading: true,
      }
    case types.UPDATE_PROFITS: {
      if (!payload) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
        }
      }
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: payload,
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.REFRESH:
    case timeRangeTypes.SET_TIME_RANGE:
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default profitsReducer
