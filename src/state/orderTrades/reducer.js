// https://docs.bitfinex.com/reference#rest-auth-order-trades

import { mapPair, formatPair } from 'state/symbols/utils'
import authTypes from 'state/auth/constants'
import { fetchFail } from 'state/reducers.helper'
import _get from 'lodash/get'

import types from './constants'

const initialState = {
  dataReceived: false,
  pageLoading: false,
  entries: [],
  targetPair: undefined,
  id: undefined,
}

export function ordersIdReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH_ORDER_TRADES:
      return {
        ...state,
        pageLoading: true,
      }
    case types.UPDATE_ORDER_TRADES: {
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
          symbol,
          mtsCreate,
          orderID,
          execAmount,
          execPrice,
          orderType,
          orderPrice,
          maker,
          fee,
          feeCurrency,
        } = entry

        return {
          id,
          pair: mapPair(formatPair(symbol)),
          mtsCreate,
          orderID,
          execAmount,
          execPrice,
          orderType,
          orderPrice,
          maker,
          fee,
          feeCurrency,
        }
      })
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        entries: [...state.entries, ...entries],
      }
    }
    case types.FETCH_FAIL:
      return fetchFail(state)
    case types.SET_PAIR:
      return {
        ...initialState,
        targetPair: payload,
      }
    case types.SET_PARAMS:
      return {
        ...initialState,
        ...payload,
      }
    case types.REFRESH:
      return {
        ...initialState,
        targetPair: state.targetPair,
        id: state.id,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default ordersIdReducer
