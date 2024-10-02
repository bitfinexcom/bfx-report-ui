// Return the active positions of a user between two dates
import { call, put, takeLatest } from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'

const getReqPositions = () => makeFetchCall('getActivePositions')

const resMock = [
  {
    symbol: 'tBTCF0:USTF0',
    status: 'ACTIVE',
    amount: 0.1685,
    basePrice: 59346,
    marginFunding: 0.000010142,
    marginFundingType: 0,
    pl: 730.447,
    plPerc: 7.304,
    liquidationPrice: 53971.104,
    leverage: null,
    id: 1806951613,
    mtsCreate: 1725551525000,
    mtsUpdate: 1725552006000,
    type: 1,
    collateral: 955.66881991,
    collateralMin: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    symbol: 'tBTCUST',
    status: 'ACTIVE',
    amount: 0.00315,
    basePrice: 57088,
    marginFunding: 0.000235,
    marginFundingType: 0,
    pl: 560.1256,
    plPerc: 4.677,
    liquidationPrice: 53971.104,
    leverage: null,
    id: 1789887824,
    mtsCreate: 1723017162000,
    mtsUpdate: 1723017162000,
    type: 0,
    collateral: 124.6789,
    collateralMin: null,
    meta: null,
    _isDataFromApiV2: true,
  },
  {
    symbol: 'tETHF0:USTF0',
    status: 'ACTIVE',
    amount: -0.02499,
    basePrice: 3751.7,
    marginFunding: 0.00021719,
    marginFundingType: 0,
    pl: -0.3356784,
    plPerc: -0.034,
    liquidationPrice: 3673.2,
    leverage: null,
    id: 1746559759,
    mtsCreate: 1716364328000,
    mtsUpdate: 1716364328000,
    type: 1,
    collateral: 2.07461869,
    collateralMin: null,
    meta: null,
  },
  {
    symbol: 'tETHUST',
    status: 'ACTIVE',
    amount: 0.025,
    basePrice: 3750.5,
    marginFunding: 0.000785,
    marginFundingType: 0,
    pl: 372.127,
    plPerc: 10.567,
    liquidationPrice: 3478.2,
    leverage: null,
    id: 1746559968,
    mtsCreate: 1716364336000,
    mtsUpdate: 1716364369000,
    type: 0,
    collateral: 0,
    collateralMin: null,
    meta: null,
  },
]

function* fetchActivePositions() {
  try {
    const { result, error } = yield call(getReqPositions)
    console.log('+++result', result)
    yield put(actions.updateAPositions(resMock))
    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'positions.title',
        detail: error?.message ?? JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'positions.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchPositionsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* positionsActiveSaga() {
  yield takeLatest(types.FETCH_APOSITIONS, fetchActivePositions)
  yield takeLatest(types.FETCH_FAIL, fetchPositionsFail)
}
