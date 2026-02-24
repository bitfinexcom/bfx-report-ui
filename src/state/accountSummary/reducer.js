import authTypes from 'state/auth/constants'
import { fetch, fetchFail } from 'state/reducers.helper'
import _get from 'lodash/get'
import _isPlainObject from 'lodash/isPlainObject'
import _map from 'lodash/map'

import { mapSymbol } from 'state/symbols/utils'

import types from './constants'

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  data: {},
}

const mapPerpetualCurrencies = (data) => {
  if (!_isPlainObject(data)) {
    return {}
  }

  return {
    ...data,
    trade_vol_30d: _map(data.trade_vol_30d, (item) => ({
      ...item,
      curr: mapSymbol(_get(item, 'curr'), true),
    })),
  }
}

export function accountSummaryReducer(state = initialState, action) {
  const { type: actionType, payload } = action
  switch (actionType) {
    case types.FETCH:
      return fetch(state)
    case types.UPDATE: {
      return {
        ...state,
        dataReceived: true,
        pageLoading: false,
        data: mapPerpetualCurrencies(payload[0]),
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

export default accountSummaryReducer
