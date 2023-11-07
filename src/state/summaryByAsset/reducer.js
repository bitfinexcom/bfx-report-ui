import authTypes from 'state/auth/constants'
import { fetch, fetchFail } from 'state/reducers.helper'

import types from './constants'

const initialData = {
  summaryByAsset: [
    {
      currency: 'BTC',
      balance: 3.02134209,
      balanceUsd: 104930.51784005,
      valueChange30dUsd: 34517.84005,
      valueChange30dPerc: 32.37147309,
      result30dUsd: 8632.74321,
      result30dPerc: 17.64147309,
      volume30dUsd: 12766.83322,
    },
    {
      currency: 'ETH',
      balance: 1.97806237,
      balanceUsd: 3709.75707,
      valueChange30dUsd: 743.9858062,
      valueChange30dPerc: 17.0523,
      result30dUsd: 869.137234,
      result30dPerc: 23.4271,
      volume30dUsd: 2213.35707,
    },
    {
      currency: 'LEO',
      balance: 8.72879652,
      balanceUsd: 34.653322,
      valueChange30dUsd: -7.943199999999706,
      valueChange30dPerc: -0.3314730912734568,
      result30dUsd: -18.6432,
      result30dPerc: -2.3714730912734568,
      volume30dUsd: 17.9432,
    },
  ],
  total: {
    balanceUsd: 108674.93,
    valueChange30dUsd: 35253.8826,
    valueChange30dPerc: 49.09,
    result30dUsd: 9483.2372,
    result30dPerc: 38.71,
    volume30dUsd: 14998.13,
  },
}

export const initialState = {
  dataReceived: false,
  pageLoading: false,
  data: {},
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
        data: initialData,
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
