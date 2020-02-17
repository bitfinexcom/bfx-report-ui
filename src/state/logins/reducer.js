// https://docs.bitfinex.com/reference#rest-auth-logins-hist
import _get from 'lodash/get'
import _toString from 'lodash/toString'

import authTypes from 'state/auth/constants'
import { fetch, fetchFail } from 'state/reducers.helper'

import types from './constants'
import queryTypes from '../query/constants'

const initialState = {
  dataReceived: false,
  pageLoading: false,
  entries: [],
}

export function loginsReducer(state = initialState, action) {
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
          mobile: mobile === false ? '' : _toString(mobile),
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
    case queryTypes.SET_TIME_RANGE:
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default loginsReducer
