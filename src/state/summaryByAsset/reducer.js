import authTypes from 'state/auth/constants'
import { fetch, fetchFail } from 'state/reducers.helper'

import types from './constants'

// const initialData = {
//   summaryByAsset: [
//     {
//       currency: 'LEO',
//       balance: 1.998,
//       balanceUsd: 7000000.9858062,
//       valueChange30dUsd: 7.9858062,
//       valueChange30dPerc: 0,
//       result30dUsd: 0.00011699999999999921,
//       result30dPerc: 0,
//       volume30dUsd: 8000.0017938,
//     },
//     {
//       currency: 'USD',
//       balance: 2388.39007987,
//       balanceUsd: 2388.39007987,
//       valueChange30dUsd: -7.943199999999706,
//       valueChange30dPerc: -0.3314730912734568,
//       result30dUsd: 0,
//       result30dPerc: 0,
//       volume30dUsd: 7.9432,
//     },
//     {
//       currency: 'BTC',
//       balance: 0.00134209,
//       balanceUsd: 39.51784005,
//       valueChange30dUsd: 0,
//       valueChange30dPerc: 0,
//       result30dUsd: 0,
//       result30dPerc: 0,
//       volume30dUsd: 0,
//     },
//   ],
//   total: {
//     balanceUsd: 2435.89372612,
//     valueChange30dUsd: 0.042606200000293803,
//     valueChange30dPerc: 0,
//     result30dUsd: 0.00011699999999999921,
//     result30dPerc: 0,
//     volume30dUsd: 15.944993799999999,
//   },
// }

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
        data: payload,
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
