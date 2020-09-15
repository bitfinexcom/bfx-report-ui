// https://docs.bitfinex.com/reference#rest-auth-audit-hist
import _get from 'lodash/get'

import authTypes from 'state/auth/constants'
import timeRangeTypes from 'state/timeRange/constants'
import { fetch, fetchFail } from 'state/reducers.helper'

import types from './constants'

const initialState = {
  dataReceived: false,
  pageLoading: false,
  entries: [],
}

export function changeLogsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.FETCH:
      return fetch(state)
    case types.UPDATE: {
      const res = _get(payload, ['data', 'res'])
      if (!res) {
        return {
          ...state,
          dataReceived: true,
          pageLoading: false,
        }
      }

      const entries = res.map((entry) => {
        const {
          ip,
          log,
          mtsCreate,
          subUserId,
          userAgent,
        } = entry

        return {
          ip,
          log,
          mtsCreate,
          subUserId,
          userAgent,
        }
      })

      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: [...state.entries, ...entries],
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
    case timeRangeTypes.SET_TIME_RANGE:
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default changeLogsReducer
