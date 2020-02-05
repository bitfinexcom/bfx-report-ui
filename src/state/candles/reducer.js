import authTypes from 'state/auth/constants'
import { fetch, fetchFail } from 'state/reducers.helper'

import types from './constants'

const initialParams = {
  start: undefined,
  end: undefined,
  timeFrame: '1h',
  pair: 'BTC:USD',
}

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  entries: [],
  ...initialParams,
  currentFetchParams: initialParams,
}

export function candlesReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH:
      return fetch(state)
    case types.UPDATE: {
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: payload,
      }
    }
    case types.SET_PARAMS:
      return {
        ...state,
        ...payload,
      }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.REFRESH:
      return {
        ...initialState,
        start: state.start,
        end: state.end,
        timeFrame: state.timeframe,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default candlesReducer
