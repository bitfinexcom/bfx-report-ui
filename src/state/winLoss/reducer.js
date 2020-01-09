import authTypes from 'state/auth/constants'
import timeframeConstants from 'ui/TimeframeSelector/constants'

import { getLastMonth } from 'state/utils'
import { fetch, fetchFail } from 'state/reducers.helper'

import types from './constants'

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  entries: [],
  start: getLastMonth(),
  end: undefined,
  timeframe: timeframeConstants.DAY,
}

export function winLossReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_WIN_LOSS:
      return fetch(state)
    case types.UPDATE_WIN_LOSS: {
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
        timeframe: state.timeframe,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default winLossReducer
