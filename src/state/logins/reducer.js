// https://docs.bitfinex.com/reference#rest-auth-logins-hist
import _get from 'lodash/get'

import authTypes from 'state/auth/constants'
import { fetchFail } from 'state/reducers.helper'

import types from './constants'

const initialState = {
  dataReceived: false,
  pageLoading: false,
  currentFetchParams: {},
  start: undefined,
  end: undefined,
  entries: [],
}

export function loginsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.FETCH:
      return {
        ...state,
        pageLoading: true,
        currentFetchParams: {
          start: state.start,
          end: state.end,
        },
      }
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
          id,
          time,
          ip,
          extraData,
        } = entry
        const {
          browser = '',
          version = '',
          is_mobile: mobile,
        } = _get(extraData, 'user_agent', {})

        return {
          id,
          mts: time,
          ip,
          browser,
          version,
          mobile: mobile || '',
          extra: extraData,
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
      return {
        ...initialState,
        start: state.start,
        end: state.end,
        currentFetchParams: state.currentFetchParams,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default loginsReducer
